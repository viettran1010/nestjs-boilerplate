import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { isValidCurrency } from '../utils/currency.utils';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private contractsRepository: Repository<Contract>,
  ) {}

  async updateCurrencyDeposited(id: number, currencyDeposited: string): Promise<Contract> {
    const contract = await this.contractsRepository.findOneBy({ id });
    if (!contract) {
      throw new NotFoundException(`Contract with ID ${id} not found`);
    }

    if (!isValidCurrency(currencyDeposited)) {
      throw new BadRequestException(`Invalid currency code: ${currencyDeposited}`);
    }

    contract.currency_deposited = currencyDeposited;
    await this.contractsRepository.save(contract);

    return contract;
  }

  // ... other methods ...
}