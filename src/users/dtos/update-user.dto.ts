import { IsEmail, IsOptional, IsString, IsNotEmpty, ValidateIf, IsDateString, IsNumber } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  name_katakana: string;

  @IsString()
  @IsOptional()
  company_name?: string;

  @IsString()
  @IsOptional()
  zip_code?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  phone_number?: string;

  @IsEmail()
  @IsOptional()
  email_address?: string;

  @IsDateString()
  @IsOptional()
  date_of_birth?: string;

  @IsDateString()
  @IsOptional()
  contact_date?: string;

  @IsString()
  @IsOptional()
  remarks?: string;

  @IsNumber()
  @ValidateIf(o => o.user_id !== undefined)
  user_id?: number;
}