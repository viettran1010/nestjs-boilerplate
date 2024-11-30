import { Body, Controller, Post, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { AuditLogsService } from './audit_logs.service';
import { LogOfficerActionDto } from './dtos/log-officer-action.dto';
import { UserPreferencesService } from '../user-preferences/user-preferences.service'; // Assuming this service exists

@Controller('audit-logs')
export class AuditLogsController {
  constructor(
    private readonly auditLogsService: AuditLogsService,
    private readonly userPreferencesService: UserPreferencesService // Assuming this service exists and can be used to get user preferences
  ) {}

  @Post('feedback')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async logOfficerAction(@Body() logOfficerActionDto: LogOfficerActionDto) {
    try {
      const userLang = await this.userPreferencesService.getUserLanguage(logOfficerActionDto.userId); // Assuming this method exists
      await this.auditLogsService.provideUserFeedback(logOfficerActionDto.action, userLang);
      return {
        status: HttpStatus.CREATED,
        message: 'Action recorded successfully.',
      };
    } catch (error) {
      // Handle the error based on its type and set the appropriate response code
      // This could be a BadRequestException, NotFoundException, etc.
      throw error;
    }
  }
}