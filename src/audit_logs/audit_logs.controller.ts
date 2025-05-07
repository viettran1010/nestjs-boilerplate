import { Body, Controller, Post } from '@nestjs/common';
import { AuditLogsService } from './audit_logs.service';
import { LogContractVerificationActionDto } from './dtos/log-contract-verification-action.dto';

@Controller('audit-logs')
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  // ...other methods...

  @Post('/log-verification-action')
  async logVerificationAction(@Body() logContractVerificationActionDto: LogContractVerificationActionDto) {
    return await this.auditLogsService.logContractVerificationAction(logContractVerificationActionDto);
  }
}