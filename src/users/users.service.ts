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
  ) {}

  async create(email: string, password: string) {
    // to make sure user is valid before saving
    // also hooks are called
    const user = this.usersRepository.create({ email, password });
    return await this.usersRepository.save(user);
  }

  async findOne(id: number) {
  async recordSuccessMessage(user_id: number, message: string, detail: string): Promise<SuccessMessage> {
    const user = await this.usersRepository.findOneBy({ id: user_id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const successMessage = new SuccessMessage();
    successMessage.user = user;
    successMessage.message = message;
    successMessage.detail = detail;
    successMessage.displayed_at = new Date();

    // Assuming there's a repository injected for SuccessMessage
    // If not, it should be added to the constructor and injected as done with usersRepository
    const successMessagesRepository = this.moduleRef.get('SuccessMessageRepository', { strict: false });
    await successMessagesRepository.save(successMessage);

    return successMessage;
  }

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