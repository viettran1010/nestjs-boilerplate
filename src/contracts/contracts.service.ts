import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './contracts.entity';
import { AuditLog } from '../audit_logs/audit_logs.entity';
import { AuditLogsService } from '../audit_logs/audit_logs.service';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private contractsRepository: Repository<Contract>,
    private auditLogsService: AuditLogsService,
  ) {}

  // ... other methods ...

  async initiateContractVerification(contractId: number): Promise<string> {
    const contract = await this.contractsRepository.findOneBy({ id: contractId });
    if (!contract) {
      throw new NotFoundException(`Contract with ID ${contractId} not found`);
    }

    // Perform additional verification steps here

    await this.contractsRepository.update(contractId, { status: 'verifying' });

    await this.auditLogsService.logContractVerificationInitiation(contract.user_id, contractId);

    return 'Contract verification initiated successfully';
  }
}