import { IsEmail, IsString, IsInt, Min, Max, IsDate, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  @Min(1)
  @Max(150)
  age: number;

  @IsDate()
  @IsOptional()
  dateOfBirth: Date;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}