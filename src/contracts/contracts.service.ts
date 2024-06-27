import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { CreateContractDto } from './dto/create-contract.dto';
import { AuditLog } from '../audit_logs/audit_log.entity';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private contractsRepository: Repository<Contract>,
    @InjectRepository(AuditLog)
    private auditLogsRepository: Repository<AuditLog>,
  ) {}

  async createContract(createContractDto: CreateContractDto): Promise<Contract> {
    const existingContract = await this.contractsRepository.findOne({
      where: {
        account_number: createContractDto.account_number,
        bank_code: createContractDto.bank_code,
      },
    });

    if (existingContract) {
      throw new ConflictException('A contract with the same account number and bank code already exists.');
    }

    const contract = this.contractsRepository.create(createContractDto);
    await this.contractsRepository.save(contract);

    const auditLog = this.auditLogsRepository.create({
      action: 'contract_registration',
      timestamp: new Date(),
      contract_id: contract.id,
      user_id: createContractDto.user_id,
    });
    await this.auditLogsRepository.save(auditLog);

    return contract;
  }
}