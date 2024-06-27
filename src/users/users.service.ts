import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { SuccessMessage } from '../success-messages/success-message.entity';
import { ErrorMessage } from '../error-messages/error-message.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(SuccessMessage)
    private successMessageRepository: Repository<SuccessMessage>,
    @InjectRepository(ErrorMessage)
    private errorMessageRepository: Repository<ErrorMessage>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createSuccessMessage(message: string, detail: string, user_id: number): Promise<SuccessMessage> {
    const successMessage = this.successMessageRepository.create({ message, detail, user_id });
    return this.successMessageRepository.save(successMessage);
  }

  async createErrorMessage(error_message: string, error_detail: string, user_id: number): Promise<ErrorMessage> {
    const errorMessage = this.errorMessageRepository.create({ error_message, error_detail, user_id });
    return this.errorMessageRepository.save(errorMessage);
  }

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
}