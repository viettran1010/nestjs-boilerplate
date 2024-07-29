import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog, AuditActionType } from './audit_log.entity';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  async logContractUpdateAction(contract_id: number, user_id: number, action: AuditActionType): Promise<AuditLog> {
    const auditLogEntry = this.auditLogRepository.create({
      contract_id,
      user_id,
      action,
      timestamp: new Date(),
    });

    await this.auditLogRepository.save(auditLogEntry);
    return auditLogEntry;
  }
}