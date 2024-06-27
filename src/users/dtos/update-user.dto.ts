import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsEmail({}, { message: 'Invalid email address format.' })
  @IsOptional()
  email: string;
}