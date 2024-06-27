import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString({ message: 'Password must be a string' })
  @Length(8, 128, { message: 'Password must be between 8 and 128 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character' })
  password: string;
}