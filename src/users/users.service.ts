import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SuccessMessage } from '../success_messages/success_message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(SuccessMessage)
    private successMessagesRepository: Repository<SuccessMessage>
  ) {}

  async create(email: string, password: string) {
    const user = this.usersRepository.create({ email, password });
    return await this.usersRepository.save(user);
  }

  async findOne(id: number): Promise<User | null> {
    if (!id) {
      return null;
    }
    return await this.usersRepository.findOneBy({ id });
  }

  async recordSuccessMessage(userId: number, message: string, detail: string): Promise<SuccessMessage> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const successMessage = new SuccessMessage();
    successMessage.user_id = user.id;
    successMessage.message = message;
    successMessage.detail = detail;
    successMessage.displayed_at = new Date();

    await this.successMessagesRepository.save(successMessage);

    return successMessage;
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