import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private contractsRepository: Repository<Contract>,
  ) {}

  async checkDuplicateContract(bank_code: string, account_number: string): Promise<boolean> {
    const existingContract = await this.contractsRepository.findOne({
      where: {
        bank_code: bank_code,
        account_number: account_number,
      },
    });
    return existingContract ? true : false;
  }

  // ... other methods in the service
}