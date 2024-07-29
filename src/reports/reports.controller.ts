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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { ReportResponseDto } from './dtos/report.response.dto';
import { ReportsService } from './reports.service';
import { JwtService } from '@nestjs/jwt';

@Controller('reports')
export class ReportsController {
  constructor(
    private reportsService: ReportsService,
    private jwtService: JwtService
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

  @Post('/login')
  async emailLogin(@Body() body: LoginUserDto) {
    const user = await this.reportsService.validateUser(body.email, body.password);
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }
    // Generate JWT tokens
    const accessToken = this.jwtService.sign({ id: user.id });
    const refreshToken = this.jwtService.sign({ id: user.id }, { expiresIn: '7d' }); // Refresh token with longer expiry

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      resource_owner: 'reports',
      resource_id: user.id,
      expires_in: 3600,
      token_type: 'Bearer',
      scope: 'report',
      created_at: new Date().getTime(),
      refresh_token_expires_in: 604800,
    };
  }
}