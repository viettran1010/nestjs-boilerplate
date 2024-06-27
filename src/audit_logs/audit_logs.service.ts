import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditAction } from './dtos/log-contract-verification-action.dto';
import { Repository } from 'typeorm';
import { AuditLog } from './audit_log.entity';
import { LogContractVerificationActionDto } from './dtos/log-contract-verification-action.dto';
import { UsersService } from '../users/users.service';
import { ContractsService } from '../contracts/contracts.service';

@Injectable()
export class AuditLogsService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogsRepository: Repository<AuditLog>,
    private usersService: UsersService,
    private contractsService: ContractsService
  ) {}

  async logContractVerificationAction(dto: LogContractVerificationActionDto): Promise<AuditLog> {
    const { userId, contractId, action, timestamp } = dto;

    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const contract = await this.contractsService.findOne(contractId);
    if (!contract) {
      throw new NotFoundException(`Contract with ID ${contractId} not found`);
    }

    const auditLog = this.auditLogsRepository.create({
      user,
      contract,
      action,
      timestamp
    });

    return await this.auditLogsRepository.save(auditLog);
  }

  async logContractVerificationInitiation(userId: number, contractId: number): Promise<AuditLog> {
    const timestamp = new Date(); // Current timestamp
    const action = AuditAction.CREATED; // Assuming CREATED is the action for initiating verification

    const dto = new LogContractVerificationActionDto();
    dto.userId = userId;
    dto.contractId = contractId;
    dto.action = action;
    dto.timestamp = timestamp;

    return this.logContractVerificationAction(dto);
  }
}