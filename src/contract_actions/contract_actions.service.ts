import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractAction } from './contract_actions.entity';

@Injectable()
export class ContractActionsService {
  constructor(
    @InjectRepository(ContractAction)
    private contractActionRepository: Repository<ContractAction>,
  ) {}

  async recordAction(contractId: number, userId: number, actionTaken: string): Promise<ContractAction> {
    const action = this.contractActionRepository.create({
      contractId,
      userId,
      actionTaken,
      actionDate: new Date(),
    });
    await this.contractActionRepository.save(action);
    return action;
  }
}