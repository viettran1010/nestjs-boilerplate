import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async searchCustomer(name?: string, katakana?: string, email_address?: string) {
    const queryBuilder = this.customersRepository.createQueryBuilder('customer');

    if (name) {
      queryBuilder.andWhere('customer.name LIKE :name', { name: `%${name}%` });
    }

    if (katakana) {
      queryBuilder.andWhere('customer.name_katakana LIKE :katakana', { katakana: `%${katakana}%` });
    }

    if (email_address) {
      queryBuilder.andWhere('customer.email_address = :email', { email: email_address });
    }

    const customers = await queryBuilder.getMany();
    return customers;
  }
}