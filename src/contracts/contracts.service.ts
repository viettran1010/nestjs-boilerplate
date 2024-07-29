import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { Customer } from '../customers/customer.entity';
import { ContractDetailsResponseDto } from './dto/contract-details-response.dto';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private contractsRepository: Repository<Contract>,
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>
  ) {}

  async getContractDetails(contractId: number): Promise<ContractDetailsResponseDto> {
    try {
      const contract = await this.contractsRepository.findOne({
        where: { id: contractId },
        relations: ['customer'],
      });

      if (!contract) {
        throw new NotFoundException(`Contract with ID ${contractId} not found`);
      }
      
      const customer = await this.customersRepository.findOne({
        where: { id: contract.customer_id },
      });

      if (!customer) {
        throw new NotFoundException(`Customer with ID ${contract.customer_id} not found`);
      }
      
      return {
        customer_id: contract.customer_id,
        customer_name_katakana: contract.customer_name_katakana,
        bank_code: contract.bank_code,
        branch_code: contract.branch_code,
        account_type: contract.account_type,
        account_number: contract.account_number,
        opening_date: contract.opening_date.toISOString().split('T')[0], // Format date to YYYY-MM-DD
        remarks: contract.remarks,
        deposit_period: contract.deposit_period,
        maturity_date: contract.maturity_date ? contract.maturity_date.toISOString().split('T')[0] : null, // Format date to YYYY-MM-DD or null
        interest_rate: contract.interest_rate,
        status: contract.status,
        currency_deposited: contract.currency_deposited,
        deposit_amount: contract.deposit_amount ? parseFloat(contract.deposit_amount.toString()) : null, // Convert to float or null
        deposit_date: contract.deposit_date ? contract.deposit_date.toISOString().split('T')[0] : null, // Format date to YYYY-MM-DD or null
        name: customer.name,
        name_katakana: customer.name_katakana,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    } 
  }
}