import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private contractsRepository: Repository<Contract>,
  ) {}

  async validateAndFindContract(contract_id: number): Promise<Contract> {
    if (!contract_id) {
      throw new NotFoundException('Contract ID is required');
    }
    const contract = await this.contractsRepository.findOneBy({ id: contract_id });
    if (!contract) {
      throw new NotFoundException('Contract not found');
    }
    return contract;
  }

  // Other service methods would go here
}