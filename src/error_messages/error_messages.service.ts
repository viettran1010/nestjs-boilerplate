import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { AuditLog } from '../audit_logs/audit_log.entity';
import { Repository } from 'typeorm';
import { ErrorMessage } from './error_message.entity';

@Injectable()
export class ErrorMessagesService {
  constructor(
    @InjectRepository(ErrorMessage)
    private errorMessageRepository: Repository<ErrorMessage>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
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
      const user = await this.userRepository.findOne(user_id);
      if (!user) {
        throw new NotFoundException('Invalid user ID.');
      }

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
        const auditLog = this.auditLogRepository.create({
          action: 'error_retry',
          timestamp: new Date(),
          user_id: user_id,
          contract_id: contract_id,
        });
        await this.auditLogRepository.save(auditLog);
      }

      return { success: true, message: 'Error logged successfully' };
    } catch (error) {
      // Handle the error appropriately in your project context
      console.error('Error logging message:', error);
      throw new NotFoundException('Error logging message');
    }
  }
}