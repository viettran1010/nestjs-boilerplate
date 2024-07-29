import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, Repository } from '@nestjs/typeorm';
import { ErrorMessage } from './error_message.entity';

@Injectable()
export class ErrorMessagesService {
  constructor(
    @InjectRepository(ErrorMessage)
    private errorMessageRepository: Repository<ErrorMessage>,
  ) {}

  async logErrorMessage(
    user_id: number,
    error_icon: string,
    error_message: string,
    error_detail: string,
    timestamp: Date,
    action_taken: string,
    contract_id?: number
  ) {
    try {
      const errorMessage = this.errorMessageRepository.create({
        user_id,
        error_icon,
        error_message,
        error_detail,
        timestamp,
        action_taken,
        contract_id,
      });
      await this.errorMessageRepository.save(errorMessage);
      return { success: true, message: 'Error logged successfully' };
    } catch (error) {
      // Handle the error appropriately in your project context
      console.error('Error logging message:', error);
      throw new NotFoundException('Error logging message');
    }
  }

  async findMostRecentErrorMessage(userId: number): Promise<ErrorMessage> {
    const errorMessage = await this.errorMessageRepository.findOne({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
    });

    if (!errorMessage) {
      throw new NotFoundException('No error message found for the given user.');
    }

    return errorMessage;
  }

  // Other methods...
}