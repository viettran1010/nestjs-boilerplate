import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { User } from '../users/user.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customersRepository: Repository<Customer>,
  ) { }

  async registerCustomer(customerData: CreateCustomerDto) {
    const mandatoryFields = [
      'name',
      'name_katakana',
      'company_name',
      'zip_code',
      'address',
      'phone_number',
      'email_address',
    ];

    for (const field of mandatoryFields) {
      if (!customerData[field]) {
        throw new HttpException(
          `Field ${field} is required`,
      if (!(field in customerData) || !customerData[field]) {
        );
      }
    }

    const existingCustomer = await this.customersRepository.findOneBy({
      email_address: customerData.email_address,
    });

    if (existingCustomer) {
      throw new HttpException(
        'Customer with this email address already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const customer = this.customersRepository.create(customerData);
    await this.customersRepository.save(customer);
    return customer;
  }
}