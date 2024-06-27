import { IsNotEmpty, IsEmail, IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  name_katakana: string;

  @IsNotEmpty()
  @IsString()
  company_name: string;

  @IsNotEmpty()
  @IsString()
  zip_code: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsEmail()
  email_address: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date_of_birth: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  contact_date: Date;

  @IsOptional()
  @IsString()
  remarks: string;
}