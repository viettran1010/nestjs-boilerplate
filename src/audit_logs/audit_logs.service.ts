import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit_log.entity';
import { ErrorMessage } from '../error_messages/error_message.entity';

@Injectable()
export class AuditLogsService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
    @InjectRepository(ErrorMessage)
    private errorMessageRepository: Repository<ErrorMessage>,
  ) {}

  async logAuditEntry(action: string, timestamp: Date, user_id: number, contract_id?: number) {
    const auditLog = this.auditLogRepository.create({
      action,
      timestamp,
      user_id,
      contract_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await this.auditLogRepository.save(auditLog);

    if (action === 'retry') {
      // Assuming there is a method to find error messages by user_id and contract_id
      const errorMessages = await this.errorMessageRepository.find({
        where: { user_id, contract_id },
      });
      for (const errorMessage of errorMessages) {
        errorMessage.auditLog = auditLog;
        await this.errorMessageRepository.save(errorMessage);
      }
    }

    return auditLog;
  }
}