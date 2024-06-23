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
  HttpStatus,
  Req,
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
import { AuthService } from '../users/auth.service';
import { Request } from 'express';

@Controller('reports')
export class ReportsController {
  constructor(
    private reportsService: ReportsService,
    private authService: AuthService,
  ) {}

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

  @Post('/reset-password')
  async sendResetPasswordEmail(@Body() body: ResetPasswordRequestDto) {
    await this.reportsService.resetPasswordRequest(body.email);
    return {
      statusCode: HttpStatus.OK,
      message: 'If a user with that email exists, we have sent a password reset link.',
    };
  }

  @Post('/api/auth/reports_login')
  async reportsLogin(@Body() body: CreateReportDto, @Req() request: Request) {
    const { email, password, grant_type, client_id, client_secret, refresh_token, scope } = body;

    if (!email || !scope || !grant_type) {
      throw new BadRequestException('email, scope, and grant_type are required fields');
    }

    if (grant_type === 'password') {
      if (!password) {
        throw new BadRequestException('password is required');
      }
      const user = await this.authService.validateUser(email, password);
      if (!user) {
        throw new BadRequestException('Email or password is not valid');
      }
      const accessToken = await this.authService.generateJwtToken(user.id);
      const refreshToken = await this.authService.generateRefreshToken(user.id);
      return {
        access_token: accessToken,
        refresh_token: refreshToken,
        resource_owner: 'reports',
        resource_id: user.id,
        expires_in: 3600 * 24,
        token_type: 'Bearer',
        scope: 'reports',
        created_at: new Date().getTime(),
        refresh_token_expires_in: 3600 * 24,
      };
    } else if (grant_type === 'refresh_token') {
      if (!refresh_token) {
        throw new BadRequestException('refresh_token is required');
      }
      // Logic to refresh the token
      // ...
    } else {
      throw new BadRequestException('Invalid grant_type');
    }
  }
}