import { IsString, IsNotEmpty, IsEmail, IsDate, ValidateIf, isDateString } from 'class-validator';

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

  @IsNotEmpty({ message: 'Date of birth is required and must be a valid date not in the future.' })
  @IsDate()
  @ValidateIf((o) => !isDateString(o.date_of_birth) || isFuture(o.date_of_birth))
  date_of_birth: Date; // Custom future date validation logic needed here
}