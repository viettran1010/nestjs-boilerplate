import { IsString, IsNotEmpty, IsEmail, IsNumber, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCustomerDto {
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsNotEmpty()
  @IsString()
  name_katakana?: string;

  @IsOptional()
  @IsString()
  company_name?: string;

  @IsOptional()
  @IsString()
  zip_code?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsEmail()
  email_address?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date_of_birth?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  contact_date?: Date;

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsOptional()
  @IsNumber()
  user_id?: number;
}