import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { Customer } from '../customers/customer.entity';
import { ContractDetailsResponseDto, ContractStatus } from './dto/contract-details-response.dto';
import { AuditLog } from '../audit_logs/audit_log.entity';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(AuditLog) private auditLogsRepository: Repository<AuditLog>,
    @InjectRepository(Contract) private contractsRepository: Repository<Contract>,
    @InjectRepository(Customer) private customersRepository: Repository<Customer>
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
        opening_date: contract.opening_date,
        remarks: contract.remarks,
        deposit_period: contract.deposit_period,
        maturity_date: contract.maturity_date,
        interest_rate: contract.interest_rate,
        status: contract.status,
        currency_deposited: contract.currency_deposited,
        deposit_amount: contract.deposit_amount,
        deposit_date: contract.deposit_date,
        name: customer.name,
        name_katakana: customer.name_katakana,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateContractStatus(contractId: number, newStatus: ContractStatus): Promise<void> {
    const contract = await this.contractsRepository.findOne({ where: { id: contractId } });

    if (!contract) {
      throw new NotFoundException(`Contract with ID ${contractId} not found`);
    }

    contract.status = newStatus;
    await this.contractsRepository.save(contract);

    const auditLog = new AuditLog();
    auditLog.action = newStatus;
    auditLog.timestamp = new Date();
    auditLog.contract_id = contractId;
    // Assuming user_id is obtained from the current session or token
    // Replace 'currentUserId' with the actual logic to retrieve the current user's ID
    const currentUserId = this.getCurrentUserId();
    auditLog.user_id = currentUserId;

    await this.auditLogsRepository.save(auditLog);
  }

  // Placeholder for the getCurrentUserId method
  // Implement the actual logic to retrieve the current user's ID
  private getCurrentUserId(): number {
    // This is a placeholder. Replace with actual logic to obtain the current user's ID.
    return 1; // Example user ID
  }
}