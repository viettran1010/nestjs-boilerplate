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

  @Patch('/confirm-email/:token')
  async confirmEmail(@Param('token') token: string) {
    try {
      const report = await this.reportsService.confirmEmail(token);
      return report;
    } catch (error) {
      throw new BadRequestException(error.message);
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