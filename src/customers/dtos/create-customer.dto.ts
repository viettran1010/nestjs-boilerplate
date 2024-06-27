import { IsString, IsEmail, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCustomerDto {
  @IsString()
  name: string;

  @IsString()
  name_katakana: string;

  @IsString()
  company_name: string;

  @IsString()
  zip_code: string;

  @IsString()
  address: string;

  @IsString()
  phone_number: string;

  @IsEmail()
  email_address: string;

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
}