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
  Res,
} from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { LoginUserDto } from './dtos/login-user.dto'; // Added import for LoginUserDto
import { ReportResponseDto } from './dtos/report.response.dto';
import { ReportsService } from './reports.service';
import { JwtService } from '@nestjs/jwt'; // Added import for JwtService

@Controller('reports')
export class ReportsController {
  constructor(
    private reportsService: ReportsService,
    private jwtService: JwtService // Added JwtService to the constructor
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
  async emailLogin(@Body() body: LoginUserDto, @Res() response) {
    try {
      const user = await this.reportsService.validateUser(body.email, body.password);
      if (!user) {
        throw new BadRequestException('Email or password is not valid');
      }

      if (!user.confirmed_at) {
        throw new BadRequestException('User is not confirmed');
      }

      if (user.locked_at) {
        const lockDuration = new Date().getTime() - user.locked_at.getTime();
        if (lockDuration < 2 * 60 * 60 * 1000) {
          throw new BadRequestException('User is locked');
        }
      }

      // Reset failed attempts
      await this.reportsService.resetFailedAttempts(user.id);

      // Generate tokens
      const payload = { id: user.id };
      const accessToken = await this.jwtService.signAsync(payload, {
        expiresIn: '24h',
      });
      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: '24h',
      });

      response.json({
        access_token: accessToken,
        refresh_token: refreshToken,
        resource_owner: 'reports',
        resource_id: user.id,
        expires_in: 86400,
        token_type: 'Bearer',
        scope: 'report',
        created_at: new Date(),
        refresh_token_expires_in: 86400,
      });
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}