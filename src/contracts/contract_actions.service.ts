import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractAction } from '../contract_actions/contract_action.entity';
import { Contract } from './contract.entity';

@Injectable()
export class ContractActionsService {
  constructor(
    @InjectRepository(ContractAction)
    private contractActionsRepository: Repository<ContractAction>,
    @InjectRepository(Contract)
    private contractsRepository: Repository<Contract>,
  ) {}

  async recordContractAction(contractId: number, userId: number, actionType: string): Promise<ContractAction> {
    const contract = await this.contractsRepository.findOneBy({ id: contractId });
    if (!contract) {
      throw new NotFoundException(`Contract with ID ${contractId} not found`);
    }

    const contractAction = this.contractActionsRepository.create({
      contract,
      user: { id: userId },
      action: actionType,
      action_date: new Date(),
    });

    return await this.contractActionsRepository.save(contractAction);
  }

  // ... other methods in the service
}