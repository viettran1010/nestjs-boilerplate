import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  // ... other methods ...

  async validateCustomer(createCustomerDto: CreateCustomerDto) {
    const errors = [];
    const { name, name_katakana, company_name, zip_code, address, phone_number, email_address, date_of_birth } = createCustomerDto;

    // Check for mandatory fields
    if (!name) errors.push('Name is required.');
    if (!name_katakana) errors.push('Name in Katakana is required.');
    if (!company_name) errors.push('Company name is required.');
    if (!zip_code) errors.push('Zip code is required.');
    if (!address) errors.push('Address is required.');
    if (!phone_number) errors.push('Phone number is required.');
    if (!email_address) errors.push('Email address is required.');

    // Check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email_address && !emailRegex.test(email_address)) {
      errors.push('Email address is required and must be valid.');
    }

    // Check for valid date format and not in the future
    const currentDate = new Date();
    const dob = new Date(date_of_birth);
    if (!date_of_birth || isNaN(dob.getTime()) || dob > currentDate) {
      errors.push('Date of birth is required and must be a valid date not in the future.');
    }

    // If there are any errors, throw BadRequestException with the errors
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    // If validation passes, return a success message
    return { status: 200, message: 'Customer registration data is valid.' };
  }
}