import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuccessMessage } from '../success_messages/success_message.entity';

@Injectable()
export class SuccessMessageService {
  constructor(
    @InjectRepository(SuccessMessage)
    private successMessageRepository: Repository<SuccessMessage>,
  ) {}

  /**
   * Dismisses a success message by setting the closed_at field to the current date and time.
   * @param id - The ID of the success message to dismiss.
   * @throws NotFoundException if the success message is not found.
   */
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