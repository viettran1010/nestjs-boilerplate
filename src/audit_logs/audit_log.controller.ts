import { Body, Controller, Post } from '@nestjs/common';
import { AuditLogService } from './audit_log.service';
import { CreateAuditLogDto } from './dtos/create-audit-log.dto';

@Controller('audit-logs')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Post()
  async createAuditLog(@Body() createAuditLogDto: CreateAuditLogDto) {
    return await this.auditLogService.logUpdateAction(
      createAuditLogDto.action,
      createAuditLogDto.timestamp,
      createAuditLogDto.contract_id,
      createAuditLogDto.user_id,
    );
  }
}