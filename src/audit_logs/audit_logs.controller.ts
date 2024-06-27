import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuditLogService } from './audit_logs.service';
import { CreateAuditLogDto } from './dtos/create-audit-log.dto';

@Controller('audit-logs')
export class AuditLogsController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Post('/log-address-update')
  @UsePipes(new ValidationPipe({ transform: true }))
  async logAddressUpdate(@Body() createAuditLogDto: CreateAuditLogDto) {
    return await this.auditLogService.logAddressUpdate(
      createAuditLogDto.userId,
      createAuditLogDto.action,
      createAuditLogDto.timestamp,
      createAuditLogDto.addressUpdateId,
    );
  }
}