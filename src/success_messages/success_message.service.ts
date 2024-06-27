import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuccessMessage } from './success_message.entity';

@Injectable()
export class SuccessMessageService {
  constructor(
    @InjectRepository(SuccessMessage)
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

  // Other service methods...
}