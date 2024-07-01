import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customersRepository: Repository<Customer>,
  ) {}

  async updateCustomer(updateData: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.customersRepository.findOneBy({ id: updateData.id });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${updateData.id} not found`);
    }

    Object.assign(customer, updateData);
    await this.customersRepository.save(customer);
    return customer;
  }
}