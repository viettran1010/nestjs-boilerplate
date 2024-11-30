import { BadRequestException, Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private mailerService: MailerService,
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

    // generate a confirmation token
    const confirmationToken = randomBytes(32).toString('hex');

    // create user and save
    const user = await this.usersService.create({
      email,
      password: result,
      confirmation_token: confirmationToken,
      confirmed_at: null,
    });

    // send confirmation email
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Our App! Confirm Your Email',
      template: './email_confirmation', // path to the email template
      context: { // data to be sent to template engine
        email,
        token: confirmationToken,
        url: `http://myapp.com/confirm?token=${confirmationToken}`, // URL to be used in the email
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