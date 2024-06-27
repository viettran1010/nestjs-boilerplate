import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Contract } from '../contracts/contract.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Contract) private contractsRepository: Repository<Contract>,
  ) {}

  async create(email: string, password: string) {
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

  async getAllContracts() {
    return await this.contractsRepository.find();
  }
}