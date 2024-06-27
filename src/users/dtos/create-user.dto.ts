import { IsEmail, IsString, IsBoolean, IsInt, Min, Max } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  admin: boolean;

  @IsInt()
  @Min(0)
  @Max(150)
  age: number;
}