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

  async logUpdateAccountTypeInformation(contract_id: number, user_id: number) {
    const auditLog = this.auditLogsRepository.create({
      action: 'update_account_type_information',
      timestamp: new Date(),
      contract_id: contract_id,
      user_id: user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });
    await this.auditLogsRepository.save(auditLog);
  }

  // Other service methods...
}