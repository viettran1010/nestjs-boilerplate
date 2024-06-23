import { IsEmail, IsOptional, IsString, IsInt, Min, Max } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(150)
  age: number;
}