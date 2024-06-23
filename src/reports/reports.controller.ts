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
} from '@nestjs/common';
import { AuthService } from '../users/auth.service';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsLoginDto } from './dtos/reports-login.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { ReportResponseDto } from './dtos/report.response.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(
    private reportsService: ReportsService,
    private authService: AuthService
  ) {}

  @Post('/api/auth/reports_login')
  async reportsLogin(@Body() body: ReportsLoginDto) {
    if (body.grant_type === 'password') {
      const user = await this.authService.signin(body.email, body.password);
      // TODO: Generate JWT token and return the appropriate response body
      // This is a placeholder response and should be replaced with actual token generation logic
      return {
        access_token: 'generated_access_token',
        refresh_token: 'generated_refresh_token',
        resource_owner: user.email,
        resource_id: user.id,
        expires_in: 3600,
        token_type: 'bearer',
        scope: 'reports',
        created_at: Date.now(),
        refresh_token_expires_in: null,
      };
    } else if (body.grant_type === 'refresh_token') {
      if (!body.refresh_token) {
        throw new BadRequestException('refresh_token is required');
      }
      // TODO: Implement refresh token logic
      // This is a placeholder response and should be replaced with actual refresh token logic
      return {
        access_token: 'new_generated_access_token',
        refresh_token: 'new_generated_refresh_token',
        resource_owner: 'user@example.com',
        resource_id: 1,
        expires_in: 3600,
        token_type: 'bearer',
        scope: 'reports',
        created_at: Date.now(),
        refresh_token_expires_in: null,
      };
    } else {
      throw new BadRequestException('Invalid grant_type');
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportResponseDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }

  @Post('/logout')
  async logout(@Body() body: { token: string; token_type_hint: string }) {
    try {
      await this.reportsService.removeToken(body.token, body.token_type_hint);
      return { statusCode: 200, message: 'Logout successful' };
    } catch (error) {
      // In a real-world application, you would want to handle different types of errors differently
      // For example, you might return a different status code for a database error vs an invalid token error
      // Here we're just returning a generic error response for simplicity
      return { statusCode: 500, message: 'An error occurred during logout' };
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
}