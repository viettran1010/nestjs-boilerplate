import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { AuditLog } from '../audit_logs/audit_log.entity';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private contractsRepository: Repository<Contract>,
    @InjectRepository(AuditLog)
    private auditLogsRepository: Repository<AuditLog>,
  ) {}

  // ... other methods ...

  async updateAccountTypeInformation(contractId: number, depositAmount: number, depositDate: Date, userId: number): Promise<string> {
    const contract = await this.contractsRepository.findOneBy({ id: contractId });
    if (!contract) {
      throw new NotFoundException(`Contract with ID ${contractId} not found`);
    }

    contract.deposit_amount = depositAmount;
    contract.deposit_date = depositDate;
    await this.contractsRepository.save(contract);

    const auditLog = this.auditLogsRepository.create({
      action: 'update_account_type_information',
      timestamp: new Date(),
      contract_id: contractId,
      user_id: userId,
    });
    await this.auditLogsRepository.save(auditLog);

    return 'Account type information updated successfully';
  }
}