import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Report } from '../reports/report.entity'; // Imported Report entity
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsersService } from './users.service';
import { ReportsService } from '../reports/reports.service'; // Assuming ReportsService exists

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private mailerService: MailerService,
    private usersService: UsersService,
    private reportsService: ReportsService // Assuming this service is injected
  ) {}

  async signup(email: string, password: string) {
    // validate user email doesn't exist
    const users = await this.usersService.find(email);
    if (users && users.length > 0) {
      throw new BadRequestException('email in use');
    }

    // Generate a secure confirmation token
    const confirmation_token = randomBytes(32).toString('hex');

    // Hash the password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    // Create user and save with confirmation token and confirmed_at set to null
    const user = await this.usersService.create(email, result, confirmation_token);

    // Send confirmation email
    await this.mailerService.sendMail({
      to: email,
      subject: 'Confirm your email',
      template: 'email_confirmation', // The name of the template file
      context: {
        email: email,
        token: confirmation_token,
        url: 'http://your-app-url.com/confirm', // Replace with your frontend URL
        link: 'Confirm Email' // The text for the link
      },
    });

    return user;
  }

  async signupReport(email: string, password: string) {
    // validate report email doesn't exist
    const reports = await this.reportsService.find(email);
    if (reports && reports.length > 0) {
      throw new BadRequestException('email in use');
    }

    // Generate a secure random 'confirmation_token'
    const confirmation_token = randomBytes(32).toString('hex');

    // Hash the password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    // Create a new report record with the hashed password, email, and confirmation_token
    const report = new Report();
    report.email = email;
    report.encrypted_password = result;
    report.confirmation_token = confirmation_token;

    // Save the report
    await this.reportsService.create(report);

    // Use the MailerService to send a confirmation email with the 'confirmation_token'
    await this.mailerService.sendMail({
      to: email,
      subject: 'Confirm your email',
      template: 'email_confirmation', // The name of the template file
      context: {
        email: email,
        token: confirmation_token,
        url: `http://your-app-url.com/confirm?confirmation_token=${confirmation_token}`, // Replace with your frontend URL
        link: 'Confirm Email' // The text for the link
      },
    });

    return report;
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