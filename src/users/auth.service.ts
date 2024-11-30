import { BadRequestException, Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { validate } from 'class-validator';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    const [salt, storedHash] = user.password.split('.');
    
    const credentials = new CreateUserDto();
    credentials.email = email;
    credentials.password = password;

    const errors = await validate(credentials);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed for email or password');
    }

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('invalid credentials');
    }

    return user;
  }
}