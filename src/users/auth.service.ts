import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { promisify } from 'util';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { Report } from '../reports/report.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  async signup(email: string, password: string) {
    // validate user email doesn't exist
    const users = await this.usersService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    // hash the password
    // generate a salt
    const salt = randomBytes(8).toString('hex');
    // hash the password + salt
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex'); // separator to split salt and hash

    // create user and save
    const user = await this.usersService.create(email, result);
    return user;
  }

  async registerReport(email: string, password: string) {
    // validate report email doesn't exist
    const report = await this.reportRepository.findOne({ email });
    if (report) {
      throw new BadRequestException('email in use');
    }

    // hash the password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const encryptedPassword = salt + '.' + hash.toString('hex');

    // create new report and save
    const newReport = this.reportRepository.create({
      email,
      encrypted_password: encryptedPassword,
    });
    await this.reportRepository.save(newReport);

    return { id: newReport.id };
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('invalid credentials');
    }

    return user;
  }
}