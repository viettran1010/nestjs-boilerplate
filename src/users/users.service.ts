import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { Customer } from '../entities/customers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async searchCustomers(searchCriteria: { name?: string; katakana?: string; email_address?: string; }) {
    const queryBuilder = this.customersRepository.createQueryBuilder('customer');

    if (searchCriteria.name) {
      queryBuilder.andWhere('customer.name LIKE :name', { name: `%${searchCriteria.name}%` });
    }

    if (searchCriteria.katakana) {
      queryBuilder.andWhere('customer.katakana LIKE :katakana', { katakana: `%${searchCriteria.katakana}%` });
    }

    if (searchCriteria.email_address) {
      queryBuilder.andWhere('customer.email_address LIKE :email_address', { email_address: `%${searchCriteria.email_address}%` });
    }

    const customers = await queryBuilder.getMany();

    if (customers.length === 0) {
      throw new NotFoundException('No customers found with the provided criteria.');
    }

    return customers.map(customer => ({
      id: customer.id,
      name: customer.name,
      katakana: customer.katakana,
      phone_number: customer.phone_number,
      email_address: customer.email_address,
    }));
  }

  async create(email: string, password: string) {
    // to make sure user is valid before saving
    // also hooks are called
    const user = this.customersRepository.create({ email, password });
    return await this.customersRepository.save(user);
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    return await this.customersRepository.findOneBy({ id });
  }

  async find(email: string) {
    console.log('email: ', email);
    return await this.customersRepository.findBy({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return await this.customersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return await this.customersRepository.remove(user);
  }
}