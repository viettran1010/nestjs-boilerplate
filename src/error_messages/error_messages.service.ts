import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ErrorMessage } from './error_message.entity';
import { AuditLogsService } from '../audit_logs/audit_logs.service';

@Injectable()
export class ErrorMessagesService {
  constructor(
    @InjectRepository(ErrorMessage)
    private errorMessageRepository: Repository<ErrorMessage>,
    private auditLogsService: AuditLogsService
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

      if (action_taken === 'retry') {
        await this.auditLogsService.logAuditEntry(action_taken, timestamp, user_id, contract_id);
      }

      return { success: true, message: 'Error logged successfully' };
    } catch (error) {
      // Handle the error appropriately in your project context
      console.error('Error logging message:', error);
      throw new NotFoundException('Error logging message');
    }
  }
}