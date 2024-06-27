import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}
  
  async getCustomerDetails(userId: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { user_id: userId },
      order: { created_at: 'DESC' }
    });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return customer;
  }
}