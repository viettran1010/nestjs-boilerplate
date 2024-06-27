import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuccessMessage } from './success-message.entity';

@Injectable()
export class SuccessMessageService {
  constructor(
    @InjectRepository(SuccessMessage)
    private successMessageRepository: Repository<SuccessMessage>,
  ) {}

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
