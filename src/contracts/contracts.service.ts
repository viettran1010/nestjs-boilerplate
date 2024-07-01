import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { AuditLogService } from '../audit_logs/audit_log.service';
import { AuditActionType } from '../audit_logs/audit_log.entity';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private contractsRepository: Repository<Contract>,
    private auditLogService: AuditLogService
  ) {}

  async updateContractRemarks(contractId: number, remarks: string, userId: number): Promise<Contract> {
    const contract = await this.contractsRepository.findOneBy({ id: contractId });
    if (!contract) {
      throw new NotFoundException('Contract not found');
    }
    contract.remarks = remarks;
    await this.contractsRepository.save(contract);

    // Log the contract update action
    await this.auditLogService.logContractUpdateAction(contractId, userId, AuditActionType.UPDATE_REMARKS);

    return contract;
  }

  async update(contractId: number, updateData: any): Promise<Contract> { // Renamed method to match the controller's call
    const contract = await this.contractsRepository.findOneBy({ id: contractId });
    if (!contract) {
      throw new NotFoundException('Contract not found');
    }
    Object.assign(contract, updateData);
    await this.contractsRepository.save(contract);

    // Log the contract update action // Removed userId parameter as it's not used in the new method signature
    await this.auditLogService.logContractUpdateAction(contractId, userId, AuditActionType.UPDATE);

    return contract;
  }

  // Other service methods...
}