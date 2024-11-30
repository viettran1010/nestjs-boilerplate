import { IsEmail, IsOptional } from 'class-validator';
import { User } from '../users.entity';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;
}