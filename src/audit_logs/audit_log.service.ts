import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit_log.entity';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  async createAuditLog(action: string, timestamp: Date, contractId: number, userId: number): Promise<AuditLog> {
    const auditLog = this.auditLogRepository.create({
      action,
      timestamp,
      contract_id: contractId,
      user_id: userId,
    });

    await this.auditLogRepository.save(auditLog);
    return auditLog;
  }

  // Other service methods...
}