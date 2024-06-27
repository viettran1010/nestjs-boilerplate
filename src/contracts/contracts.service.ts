import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
  ) {}

  async updateCurrency(contractId: number, currency_deposited: string): Promise<Contract> {
    const contract = await this.contractRepository.findOneBy({ id: contractId });
    if (!contract) {
      throw new NotFoundException(`Contract with ID ${contractId} not found`);
    }

    if (!this.isValidCurrency(currency_deposited)) {
      throw new BadRequestException(`Invalid currency format: ${currency_deposited}`);
    }

    contract.currency_deposited = currency_deposited;
    return await this.contractRepository.save(contract);
  }

  private isValidCurrency(currency: string): boolean {
    // TODO: Implement actual currency validation logic
    // Placeholder for currency validation logic
    const validCurrencies = ['USD', 'EUR', 'JPY']; // This should be replaced with actual currency codes
    return validCurrencies.includes(currency);
  }
}