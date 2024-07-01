import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit_log.entity';
import { ActionType } from './audit_log.entity'; // This import is now correct

@Injectable()
export class AuditLogService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  async logUpdateAction(action: ActionType, timestamp: Date, contract_id: number, user_id: number): Promise<AuditLog> {
    const auditLog = this.auditLogRepository.create({
      action,
      timestamp: timestamp,
      contract: { id: contract_id },
      user: { id: user_id },
      created_at: new Date(),
      updated_at: new Date(),
    });

    await this.auditLogRepository.save(auditLog);
    return auditLog;
  }
}