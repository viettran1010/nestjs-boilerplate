import { IsString, IsEmail, IsDate, IsOptional, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'Name is required.' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Name in Katakana is required.' })
  @IsString()
  name_katakana: string;

  @IsNotEmpty({ message: 'Company name is required.' })
  @IsString()
  company_name: string;

  @IsNotEmpty({ message: 'Zip code is required.' })
  @IsString()
  zip_code: string;

  @IsNotEmpty({ message: 'Address is required.' })
  @IsString()
  address: string;

  @IsNotEmpty({ message: 'Phone number is required.' })
  @IsString()
  phone_number: string;

  @IsNotEmpty({ message: 'Email address is required and must be valid.' })
  @IsEmail()
  email_address: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Invalid date of birth format.' })
  date_of_birth?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Invalid contact date format.' })
  contact_date?: Date;

  @IsOptional()
  @IsString({ message: 'Invalid remarks format.' })
  remarks?: string;
}