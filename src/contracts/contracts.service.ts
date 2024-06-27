import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contracts.entity';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ContractActionsService } from './contract_actions.service';
import { validate } from 'class-validator';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private contractsRepository: Repository<Contract>,
    private contractActionsService: ContractActionsService
  ) {}

  // ... other methods ...

  async updateContractDetails(id: number, updateContractDto: UpdateContractDto) {
    const contract = await this.contractsRepository.findOneBy({ id });
    if (!contract) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }

    const errors = await validate(updateContractDto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    await this.contractsRepository.manager.transaction(async entityManager => {
      await entityManager.save(Contract, { ...contract, ...updateContractDto });
      await this.contractActionsService.recordContractAction(id, updateContractDto.user_id, 'update');
    });

    return { message: 'Contract details updated successfully' };
  }

  // ... other methods ...
}