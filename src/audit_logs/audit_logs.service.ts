import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditAction } from './audit_log.entity';
import { Repository } from 'typeorm';
import { AuditLog } from './audit_log.entity';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  async create(auditLog: AuditLog): Promise<AuditLog> {
    try {
      return await this.auditLogRepository.save(auditLog);
    } catch (error) {
      // Error handling logic here
      throw error;
    }
  }

  async logAddressUpdate(userId: number, action: string, timestamp: Date, addressUpdateId: number): Promise<AuditLog> {
    try {
      const auditLog = this.auditLogRepository.create({
        user: { id: userId },
        action: AuditAction[action as keyof typeof AuditAction],
        timestamp,
        addressUpdates: [{ id: addressUpdateId }],
        created_at: new Date(),
        updated_at: new Date(),
      });

      return await this.auditLogRepository.save(auditLog);
    } catch (error) {
      // Error handling logic here
      throw error;
    }
  }
}