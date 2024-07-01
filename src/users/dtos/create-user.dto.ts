import { IsEmail, IsString } from 'class-validator';
import { User } from '../users.entity';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}