import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private mailerService: MailerService,
    private usersService: UsersService
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