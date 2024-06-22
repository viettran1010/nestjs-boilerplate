import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { ReportResponseDto } from './dtos/report.response.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportResponseDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(
    @Body() body: ApproveReportDto,
    @Param() param: { id: string },
  ) {
    return this.reportsService.changeApproval(
      parseInt(param.id),
      body.approved,
    );
  }

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimate(query);
  }

  @Post('/signup')
  @UseInterceptors(Serialize(ReportResponseDto))
  async signup(@Body() body: CreateReportDto) {
    return await this.reportsService.signup(body.email, body.password);
  }

  @Post('/api/auth/reports_verify_confirmation_token')
  async confirmEmail(@Body('confirmation_token') confirmation_token: string) {
    const report = await this.reportsService.confirmEmail(confirmation_token);
    if (!report) {
      throw new BadRequestException('Confirmation token is not valid or has expired');
    }
    return report;
  }

  // Placeholder for the confirmEmail method in ReportsService
  // This should be implemented in the ReportsService class
  private async confirmEmail(token: string): Promise<boolean> {
    // TODO: Implement the email confirmation logic
    return false; // This should return true if the email was successfully confirmed
  }
}