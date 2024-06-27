import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { AuditLogsService } from './audit_logs.service';
import { ActionFeedbackDto } from './dtos/action-feedback.dto';

@Controller('audit-logs')
export class AuditLogsController {
  constructor(private readonly auditLogsService: AuditLogsService) {}

  @Post('/feedback')
  @UseGuards(AuthGuard)
  async provideFeedback(@Body() actionFeedbackDto: ActionFeedbackDto) {
    const { action } = actionFeedbackDto;
    const feedback = await this.auditLogsService.provideUserFeedback(action);
    return { feedback };
  }
}