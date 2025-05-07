import { Body, Controller, Post, NotFoundException } from '@nestjs/common';
import { AuditLog } from './audit_log.entity';
import { AuditAction } from './audit_log.entity';
import { AuditLogsService } from './audit_logs.service';
import { UsersService } from '../users/users.service';
import { ContractsService } from '../contracts/contracts.service';

@Controller('audit_logs')
export class AuditLogsController {
  constructor(
    private readonly auditLogsService: AuditLogsService,
    private readonly usersService: UsersService,
    private readonly contractsService: ContractsService,
  ) {}

  @Post()
  async createAuditLog(@Body() body: { action: string; timestamp: Date; contract_id: number; user_id: number }) {
    if (!body.action || !body.timestamp || !body.contract_id || !body.user_id) {
      throw new NotFoundException('Missing required fields');
    }

    const user = await this.usersService.validateAndFindUser(body.user_id);
    const contract = await this.contractsService.validateAndFindContract(body.contract_id);

    const auditLog = new AuditLog();
    auditLog.action = AuditAction[body.action as keyof typeof AuditAction];
    auditLog.timestamp = body.timestamp;
    auditLog.contract_id = contract.id;
    auditLog.user_id = user.id;

    await this.auditLogsService.createAuditLog(auditLog.action, auditLog.timestamp, auditLog.contract_id, auditLog.user_id);

    return { status: 'success', message: 'Audit log created successfully' };
  }
}