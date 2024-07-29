import { IsEmail, IsOptional, IsString, IsBoolean, IsInt, Min, Max } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  admin: boolean;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(150)
  age: number;
}