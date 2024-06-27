import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { SuccessMessage } from './success-message.entity';

@Injectable()
export class SuccessMessageService {
  constructor(
    @InjectRepository(SuccessMessage)
    private successMessageRepository: Repository<SuccessMessage>,
  ) {}

  async recordSuccessMessageDisplay(userId: number, message: string, detail: string): Promise<SuccessMessage> {
    const user = await this.successMessageRepository.manager.findOne(User, { where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const successMessage = this.successMessageRepository.create({
      user_id: userId,
      message: message,
      detail: detail,
      displayed_at: new Date(),
    });

    await this.successMessageRepository.save(successMessage);
    return successMessage;
  }

  async dismissSuccessMessage(id: number): Promise<void> {
    const successMessage = await this.successMessageRepository.findOneBy({ id });
    if (!successMessage) {
      throw new NotFoundException('Success message not found');
    }
    successMessage.closed_at = new Date();
    await this.successMessageRepository.save(successMessage);
  }

  // Other methods...
}