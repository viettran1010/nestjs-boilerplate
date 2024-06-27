import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorMessage, ActionTaken } from './error_message.entity';
import { AuditLog } from '../audit_logs/audit_log.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ErrorMessageService {
  constructor(
    @InjectRepository(ErrorMessage)
    private errorMessageRepository: Repository<ErrorMessage>,
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  async logErrorMessage(
    userId: number,
    errorIcon: string,
    errorMessage: string,
    errorDetail: string,
    timestamp: Date,
    actionTaken: ActionTaken,
  ): Promise<ErrorMessage> {
    const error = this.errorMessageRepository.create({
      user: { id: userId },
      error_icon: errorIcon,
      error_message: errorMessage,
      error_detail: errorDetail,
      timestamp,
      action_taken: actionTaken,
    });

    await this.errorMessageRepository.save(error);

    if (actionTaken === ActionTaken.RETRY) {
      // Assuming there is a method in AuditLogService to log the retry action
      await this.auditLogService.logRetryAction(userId, error.id);
    }

    return error;
  }

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