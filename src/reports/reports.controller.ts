import {
  Body,
  BadRequestException,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  HttpException, // Added from patch
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
import { ResetPasswordConfirmDto } from './dtos/create-report.dto'; // Added from patch
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

  @Post('/refresh-token')
  async refreshToken(
    @Body('refresh_token') refreshToken: string,
    @Body('scope') scope: string,
  ) {
    if (!refreshToken || scope !== 'reports') {
      throw new BadRequestException('Refresh token is not valid');
    }

    try {
      const newTokens = await this.reportsService.refreshToken(refreshToken, scope);
      return newTokens;
    } catch (error) {
      throw new BadRequestException('Refresh token is not valid');
    }
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

  // Added from patch
  @Post('/api/auth/reports_verify_reset_password_requests')
  async confirmResetPassword(@Body() dto: ResetPasswordConfirmDto) {
    try {
      await this.reportsService.confirmResetPassword(dto);
      return { message: 'Password reset successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new BadRequestException('An unexpected error occurred');
    }
  }
}