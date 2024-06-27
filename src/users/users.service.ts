import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async searchCustomers(searchCriteria: { name?: string; katakana?: string; email_address?: string; }) {
    const queryBuilder = this.usersRepository.createQueryBuilder('customer');

    if (searchCriteria.name) {
      queryBuilder.andWhere('customer.name = :name', { name: searchCriteria.name });
    }

    if (searchCriteria.katakana) {
      queryBuilder.andWhere('customer.katakana = :katakana', { katakana: searchCriteria.katakana });
    }

    if (searchCriteria.email_address) {
      queryBuilder.andWhere('customer.email_address = :email_address', { email_address: searchCriteria.email_address });
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
    const user = this.usersRepository.create({ email, password });
    return await this.usersRepository.save(user);
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    return await this.usersRepository.findOneBy({ id });
  }

  async find(email: string) {
    console.log('email: ', email);
    return await this.usersRepository.findBy({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return await this.usersRepository.remove(user);
  }
}