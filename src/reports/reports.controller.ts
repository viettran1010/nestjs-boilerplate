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
  Inject,
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
import { AuthService } from '../users/auth.service';

@Controller('reports')
export class ReportsController {
  constructor(
    private reportsService: ReportsService,
    @Inject(AuthService) private authService: AuthService
  ) {}

  @Post('/confirm')
  @Serialize(ReportResponseDto)
  async confirmEmail(@Body('token') token: string) {
    try {
      const report = await this.reportsService.confirmEmail(token);
      if (!report) {
        throw new BadRequestException('Confirmation token is not valid');
      }
      return report;
    } catch (error) {
      if (error.status === 400) {
        throw new BadRequestException(error.response);
      }
      // Re-throw the error if it's not a BadRequestException
      throw error;
    }
  }

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

  @Post('/api/auth/reports_registrations')
  @Serialize(ReportResponseDto)
  async registerReport(@Body() body: CreateReportDto) {
    try {
      const report = await this.authService.signup(body.email, body.password);
      return report;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.response);
      }
      // Re-throw the error if it's not a BadRequestException
      throw error;
    }
  }
}