import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { AuditLog } from '../audit_logs/audit_log.entity';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private contractsRepository: Repository<Contract>,
    @InjectRepository(AuditLog)
    private auditLogsRepository: Repository<AuditLog>
  ) {}

  @Transactional()
  async updateContract(contractDetails: any, userId: number): Promise<Contract> {
    const contract = await this.contractsRepository.findOneBy({ id: contractDetails.id });
    if (!contract) {
      throw new NotFoundException('Contract not found');
    }

    // Update contract details
    Object.assign(contract, contractDetails);
    await this.contractsRepository.save(contract);

    // Create audit log entry
    const auditLog = this.auditLogsRepository.create({
      action: 'update',
      timestamp: new Date(),
      contract_id: contract.id,
      user_id: userId
    });
    await this.auditLogsRepository.save(auditLog);

    return contract;
  }
}