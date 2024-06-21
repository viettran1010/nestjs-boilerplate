import { BadRequestException, Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { EmailService } from '../email/email.service'; // Added import for EmailService
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  // Added EmailService to the constructor
  constructor(private usersService: UsersService, private emailService: EmailService) {}

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

    // Generate a confirmation token (pseudo-code, implement as needed)
    const confirmation_token = randomBytes(16).toString('hex');
    // Send confirmation email
    await this.sendConfirmationEmail(email, confirmation_token);

    return user;
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

  async sendConfirmationEmail(email: string, confirmation_token: string) {
    const confirmationUrl = `http://yourfrontend.com/confirm?token=${confirmation_token}`;
    await this.emailService.sendMail({
      to: email,
      subject: 'Confirm your email',
      template: 'email_confirmation',
      context: {
        url: confirmationUrl,
        token: confirmation_token,
      },
    });
  }
}