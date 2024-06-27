import { IsNotEmpty, IsEmail, IsString, IsOptional, IsDate, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateIf(o => o.name_katakana !== '')
  @IsString()
  name_katakana: string;

  @IsNotEmpty()
  @IsString()
  company_name: string;

  @ValidateIf(o => o.zip_code !== '')
  @IsString()
  zip_code: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @ValidateIf(o => o.phone_number !== '')
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsEmail()
  email_address: string;

  @ValidateIf(o => o.date_of_birth != null)
  @IsDate()
  @Type(() => Date)
  date_of_birth: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  contact_date: Date;

  @ValidateIf(o => o.remarks !== '')
  @IsString()
  remarks: string;
}