import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Customer } from '../customers/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getRecentCustomerDetails(userId: number) {
    const customer = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.customer', 'customer')
      .where('user.id = :userId', { userId })
      .orderBy('customer.created_at', 'DESC')
      .getOne();

    if (!customer || !customer.customer) {
      throw new NotFoundException('No customer record found for the given user_id');
    }

    return customer.customer;
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