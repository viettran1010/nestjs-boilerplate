import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit-log.entity';

@Injectable()
export class AuditLogsService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogsRepository: Repository<AuditLog>,
  ) {}

  async logContractVerificationInitiation(userId: number, contractId: number) {
    const auditLog = this.auditLogsRepository.create({
      action: 'contract_verification_initiated',
      timestamp: new Date(),
      userId: userId,
      contractId: contractId,
    });
    await this.auditLogsRepository.save(auditLog);
  }
}