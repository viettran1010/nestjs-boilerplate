import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { CreateContractDto } from './dto/create-contract.dto';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private contractsRepository: Repository<Contract>,
  ) {}

  validateContractRegistration(contractData: any): string | BadRequestException {
    const requiredFields = [
      'customer_name_katakana',
      'bank_code',
      'branch_code',
      'account_type',
      'account_number',
      'opening_date',
      'deposit_period',
      'maturity_date',
      'interest_rate',
      'user_id',
      'customer_id',
    ];

    for (const field of requiredFields) {
      if (!contractData[field]) {
        throw new BadRequestException(`Field ${field} is required.`);
      }
    }

    if (contractData.opening_date > new Date()) {
      throw new BadRequestException('Opening date cannot be in the future.');
    }

    if (contractData.maturity_date <= contractData.opening_date) {
      throw new BadRequestException('Maturity date must be after the opening date.');
    }

    // Assuming there's a predefined range for interest rates
    const minInterestRate = 0;
    const maxInterestRate = 10;
    if (
      contractData.interest_rate < minInterestRate ||
      contractData.interest_rate > maxInterestRate
    ) {
      throw new BadRequestException(
        `Interest rate must be between ${minInterestRate}% and ${maxInterestRate}%.`,
      );
    }

    // Additional validations can be added here

    return 'Validation successful';
  }

  async createContract(createContractDto: CreateContractDto): Promise<Contract> {
    const existingContract = await this.contractsRepository.findOne({
      where: {
        account_number: createContractDto.account_number,
        bank_code: createContractDto.bank_code,
        branch_code: createContractDto.branch_code,
      },
    });

    if (existingContract) {
      throw new BadRequestException('A contract with the provided account details already exists.');
    }

    const contract = this.contractsRepository.create(createContractDto);
    return await this.contractsRepository.save(contract);
  }
}