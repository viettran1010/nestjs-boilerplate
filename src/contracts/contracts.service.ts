import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContractDto } from './dto/create-contract.dto';
import { AuditLog } from '../audit_logs/audit_log.entity';
import { Repository } from 'typeorm';
import { AuditAction } from '../audit_logs/audit_log.entity';
import { Contract } from './contract.entity';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private contractsRepository: Repository<Contract>,
    @InjectRepository(AuditLog)
    private auditLogsRepository: Repository<AuditLog>,
  ) {}

  async checkDuplicateContract(bank_code: string, account_number: string): Promise<boolean> {
    const existingContract = await this.contractsRepository.findOne({
      where: {
        bank_code: bank_code,
        account_number: account_number,
      },
    });
    return existingContract ? true : false;
  }

  async createContract(createContractDto: CreateContractDto): Promise<Contract> {
    const contract = this.contractsRepository.create(createContractDto);
    await this.contractsRepository.save(contract);

    const auditLog = new AuditLog();
    auditLog.action = AuditAction.CONTRACT_REGISTRATION;
    auditLog.timestamp = new Date();
    auditLog.user_id = createContractDto.user_id;
    auditLog.contract_id = contract.id;

    try {
      await this.auditLogsRepository.save(auditLog);
    } catch (error) {
      // Handle exceptions related to audit log saving
      // This could be logging the error or throwing a custom exception
      console.error('Failed to save audit log', error);
      throw new Error('Failed to save audit log');
    }

    return contract;
  }

  // ... other methods in the service
}