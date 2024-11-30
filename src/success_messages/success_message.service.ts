import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { SuccessMessage } from './success_message.entity';

@Injectable()
export class SuccessMessageService {
  constructor(
    @InjectRepository(SuccessMessage)
    private usersService: UsersService,
    private successMessageRepository: Repository<SuccessMessage>,
  ) {}

  async dismissSuccessMessage(id: number): Promise<string> {
    const successMessage = await this.successMessageRepository.findOneBy({ id });
    if (!successMessage) {
      throw new NotFoundException(`Success message with ID ${id} not found`);
    }
    successMessage.closed_at = new Date();
    await this.successMessageRepository.save(successMessage);
    return 'Success message dismissed successfully';
  }

  async recordSuccessMessage(userId: number, message: string, detail: string): Promise<SuccessMessage> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const successMessage = this.successMessageRepository.create({
      user,
      message,
      detail,
      displayed_at: new Date(),
    });
    await this.successMessageRepository.save(successMessage);
    return successMessage;
  }

  // Other service methods...
}