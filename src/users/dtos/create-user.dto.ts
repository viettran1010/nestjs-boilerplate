import { IsEmail, IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsInt()
  @IsNotEmpty()
  user_id: number;
}