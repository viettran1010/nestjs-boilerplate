import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { ContractAction } from '../contract_actions/contract_action.entity';
import { AuditLog } from '../audit_logs/audit_log.entity';

@Injectable()
export class ContractActionsService {
  constructor(
    @InjectRepository(Contract)
    private contractsRepository: Repository<Contract>,
    @InjectRepository(ContractAction)
    private contractActionsRepository: Repository<ContractAction>,
    @InjectRepository(AuditLog)
    private auditLogsRepository: Repository<AuditLog>,
  ) {}

  async recordOfficerAction(contract_id: number, user_id: number, action: string): Promise<string> {
    const contract = await this.contractsRepository.findOneBy({ id: contract_id });
    if (!contract) {
      throw new NotFoundException(`Contract with ID ${contract_id} not found`);
    }

    const contractAction = this.contractActionsRepository.create({
      contract,
      user_id,
      action,
      action_date: new Date(),
    });

    const auditLog = this.auditLogsRepository.create({
      action,
      timestamp: new Date(),
      contract_id,
      user_id,
    });

    await this.contractsRepository.manager.transaction(async entityManager => {
      await entityManager.save(contractAction);
      await entityManager.save(auditLog);
    });

    return 'Officer action recorded successfully';
  }
}