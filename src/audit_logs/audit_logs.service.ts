import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit_log.entity';

@Injectable()
export class AuditLogsService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  async createAuditLog(action: string, timestamp: Date, contract_id: number, user_id: number): Promise<AuditLog> {
    const auditLog = this.auditLogRepository.create({
      action,
      timestamp,
      contract_id,
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    await this.auditLogRepository.save(auditLog);
    return auditLog;
  }
}