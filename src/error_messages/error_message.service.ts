import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorMessage, ActionTaken } from './error_message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ErrorMessageService {
  constructor(
    @InjectRepository(ErrorMessage)
    private errorMessageRepository: Repository<ErrorMessage>,
  ) {}

  async dismissErrorMessage(userId: number, errorMessageId: number): Promise<ErrorMessage> {
    const errorMessage = await this.errorMessageRepository.findOne({
      where: { id: errorMessageId, user: { id: userId } },
    });
    if (!errorMessage) {
      throw new NotFoundException(`Error message with ID ${errorMessageId} not found.`);
    }
    errorMessage.action_taken = ActionTaken.CLOSE;
    await this.errorMessageRepository.save(errorMessage);
    return errorMessage;
  }

  // ... other service methods
}