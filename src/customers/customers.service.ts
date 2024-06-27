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

  async getCustomerDetails(user_id: number): Promise<Customer> {
    const customer = await this.customersRepository.findOne({
      where: { user: { id: user_id } },
      relations: ['user'],
    });

    if (!customer) {
      throw new NotFoundException(`Customer with user ID ${user_id} not found`);
    }

    return customer;
  }
}