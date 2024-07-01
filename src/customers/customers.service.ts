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

  // Other service methods...

  async cancelUpdate(id: number): Promise<Customer> {
    const customer = await this.customersRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException('Customer not found.');
    }
    // Implement logic to revert changes. This is a placeholder example.
    // The actual logic will depend on the project's business requirements.
    customer.updated_at = new Date(); // Reset the update timestamp or other fields as required.
    // Save the reverted changes.
    return await this.customersRepository.save(customer);
  }
}