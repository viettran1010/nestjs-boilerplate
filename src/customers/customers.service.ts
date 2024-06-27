import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async updateCustomer(updateData: {
    id: number;
    name?: string;
    name_katakana?: string;
    company_name?: string;
    zip_code?: string;
    address?: string;
    phone_number?: string;
    email_address?: string;
    date_of_birth?: Date;
    contact_date?: Date;
    remarks?: string;
    user_id?: number;
  }): Promise<Customer> {
    const customer = await this.customersRepository.findOneBy({ id: updateData.id });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${updateData.id} not found`);
    }

    Object.assign(customer, updateData);
    await this.customersRepository.save(customer);
    return customer;
  }
}