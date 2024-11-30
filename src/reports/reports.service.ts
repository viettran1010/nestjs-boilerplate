import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Report } from './report.entity';
import { MailerService } from '@nestjs-modules/mailer';

const scrypt = promisify(_scrypt);

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
    private readonly mailerService: MailerService,
  ) {}

  async signup(email: string, password: string, passwordConfirmation: string) {
    // Check if passwords match
    if (password !== passwordConfirmation) {
      throw new BadRequestException('Password confirmation does not match');
    }

    // Check if email is already taken
    const existingReport = await this.reportsRepository.findOne({
      where: { email },
    });
    if (existingReport) {
      throw new BadRequestException('Email is already taken');
    }

    // Hash the password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const encryptedPassword = `${salt}.${hash.toString('hex')}`;

    // Generate a confirmation token
    const confirmationToken = randomBytes(32).toString('hex');

    // Create new report record
    const report = this.reportsRepository.create({
      email,
      encrypted_password: encryptedPassword,
      confirmation_token: confirmationToken,
      confirmed_at: null,
    });

    // Save the new report record
    await this.reportsRepository.save(report);

    // Send a confirmation email
    await this.mailerService.sendMail({
      to: email,
      subject: 'Confirm your email',
      template: './confirmation', // The template path
      context: {
        email,
        token: confirmationToken,
        url: `http://myapp.com/confirm?token=${confirmationToken}`,
      },
    });

    return report;
  }

  create(body: CreateReportDto, user: User) {
    const report = this.reportsRepository.create(body);
    report.user = user;
    return this.reportsRepository.save(report);
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.reportsRepository.findOneBy({ id });
    if (!report) {
      throw new NotFoundException('report not found');
    }
    report.approved = approved;
    return await this.reportsRepository.save(report);
  }

  createEstimate(query: GetEstimateDto) {
    return this.reportsRepository
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('maker = :maker', { maker: query.maker })
      .andWhere('model = :model', { model: query.model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: query.lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: query.lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year: query.year })
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage: query.mileage })
      .limit(3)
      .getRawOne();
  }

  async confirmEmail(token: string): Promise<Report> {
    const report = await this.reportsRepository.findOne({
      where: {
        confirmation_token: token,
        confirmed_at: null,
      },
    });

    if (!report) {
      throw new NotFoundException('Confirmation token is not valid');
    }

    // Assuming tokens do not expire for this use case as per the requirement
    // If there was an expiration, you would check if the token is expired here

    report.confirmed_at = new Date();
    await this.reportsRepository.save(report);

    return report;
  }
}