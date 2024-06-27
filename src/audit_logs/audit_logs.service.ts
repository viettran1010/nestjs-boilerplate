import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit_log.entity';

@Injectable()
export class AuditLogsService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogsRepository: Repository<AuditLog>,
  ) {}

  async createAuditLog(action: string, timestamp: Date, contract_id: number, user_id: number): Promise<AuditLog> {
    const auditLog = this.auditLogsRepository.create({
      action,
      timestamp,
      contract_id,
      user_id,
    });

    await this.auditLogsRepository.save(auditLog);
    return auditLog;
  }

  // Other service methods would go here
}