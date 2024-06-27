import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateContractStatusDto } from './dtos/update-contract-status.dto';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private contractsRepository: Repository<Contract>,
  ) {}

  // ... other methods ...

  async updateContractStatus({ id, status }: UpdateContractStatusDto): Promise<Contract> {
    const contract = await this.contractsRepository.findOneBy({ id });
    if (!contract) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }
    contract.status = status;
    await this.contractsRepository.save(contract);
    return contract;
  }
}