import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { ResetPasswordRequestDto } from './dtos/reset-password-request.dto';
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

  @Post('/api/auth/reports_logout')
  async logout(@Body() body: CreateReportDto) {
    try {
      await this.reportsService.invalidateToken(body.token);
      return {
        statusCode: HttpStatus.OK,
        message: 'Logout successful',
      };
    } catch (error) {
      // Handle exceptions and return an appropriate error response if needed
      throw error;
    }
  }

  @Post('/reset-password')
  async sendResetPasswordEmail(@Body() body: ResetPasswordRequestDto) {
    await this.reportsService.resetPasswordRequest(body.email);
    return {
      statusCode: HttpStatus.OK,
      message: 'If a user with that email exists, we have sent a password reset link.',
    };
  }
}