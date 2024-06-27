import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validateOrReject } from 'class-validator';
import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dtos/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async registerCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    // Validate DTO
    await validateOrReject(createCustomerDto);

    // Check for existing customer with the same email
    const existingCustomer = await this.customersRepository.findOne({
      where: { email_address: createCustomerDto.email_address },
    });

    if (existingCustomer) {
      throw new ConflictException('A customer with the given email address already exists');
    }

    // Create new customer
    const newCustomer = this.customersRepository.create(createCustomerDto);
    await this.customersRepository.save(newCustomer);

    return newCustomer;
  }
}