import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { AuditLog } from '../audit_logs/audit_log.entity';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractsRepository: Repository<Contract>,
    @InjectRepository(AuditLog)
    private readonly auditLogsRepository: Repository<AuditLog>,
  ) {}

  async updateAccountTypeInformation(contract_id: number, deposit_amount: number, deposit_date: Date, user_id: number) {
    const contract = await this.contractsRepository.findOneBy({ id: contract_id });
    if (!contract) {
      throw new NotFoundException(`Contract with ID ${contract_id} not found`);
    }

    contract.deposit_amount = deposit_amount;
    contract.deposit_date = deposit_date;
    await this.contractsRepository.save(contract);

    const auditLog = this.auditLogsRepository.create({
      action: 'update_account_type_information',
      timestamp: new Date(),
      contract_id: contract.id,
      user_id: user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });
    await this.auditLogsRepository.save(auditLog);
  }

  // Other service methods...
}