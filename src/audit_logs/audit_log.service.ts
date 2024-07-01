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

  async createAuditLog(action: string, userId: number, timestamp: Date = new Date()): Promise<AuditLog> {
    const auditLog = this.auditLogRepository.create({
      action,
      user_id: userId,
      timestamp,
      created_at: timestamp,
      updated_at: timestamp,
    });

    return await this.auditLogRepository.save(auditLog);
  }

  // Other service methods...
}