import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit_log.entity';
import { ActionType } from './audit_log.entity';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  async logUpdateAction(action: ActionType, timestamp: Date, contract_id: number, user_id: number): Promise<AuditLog> {
    const auditLog = this.auditLogRepository.create({
      action,
      timestamp,
      contract_id,
      user_id,
    });

    await this.auditLogRepository.save(auditLog);
    return auditLog;
  }
}