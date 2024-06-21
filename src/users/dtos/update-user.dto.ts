import { IsEmail, IsOptional } from 'class-validator';
import { IsNumber, IsBoolean, Min } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  age?: number;

  @IsBoolean()
  @IsOptional()
  admin?: boolean;
}