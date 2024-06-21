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
import { ReportsRegistrationDto } from './dtos/reports-registration.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { ReportResponseDto } from './dtos/report.response.dto';
import { ReportsService } from './reports.service';
import { AuthService } from '../users/auth.service';

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

  @Patch('/confirm')
  @Serialize(ReportResponseDto)
  async confirmEmail(@Body('token') token: string) {
    try {
      const report = await this.reportsService.confirmEmail(token);
      if (!report) {
        throw new BadRequestException('Confirmation token is not valid');
      }
      return report;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new BadRequestException('Confirmation token is expired');
      }
      throw error;
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

  @Post('/api/auth/reports_registrations')
  async signupWithEmail(@Body() body: ReportsRegistrationDto) {
    const existingReport = await this.reportsService.findReportByEmail(body.email);
    if (existingReport) {
      throw new BadRequestException('Email is already taken');
    }

    const confirmation_token = await this.authService.generateConfirmationToken();
    const report = await this.reportsService.createReportWithEmail(body.email, body.password, confirmation_token);

    // Assuming confirmed_at is set to null by default in the createReportWithEmail method
    // If not, you should explicitly set it to null here

    await this.authService.sendConfirmationEmail(body.email, confirmation_token);

    // Assuming that the report object is returned from the createReportWithEmail method
    // If not, you should fetch the report from the database here

    return report;
  }
}