import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { ContractActionsService } from '../contract_actions/contract_actions.service';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
    private contractActionsService: ContractActionsService
  ) {}

  // ... other service methods

  async approveContract(contractId: number, userId: number): Promise<Contract> {
    const contract = await this.contractRepository.findOneBy({ id: contractId });
    if (!contract) {
      throw new NotFoundException(`Contract with ID ${contractId} not found`);
    }
    contract.status = 'Approved';
    await this.contractRepository.save(contract);
    await this.contractActionsService.recordAction(contractId, userId, 'Approved');
    return contract;
  }
}