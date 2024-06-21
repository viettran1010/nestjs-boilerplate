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
  HttpException,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
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
import { JwtService } from '@nestjs/jwt';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService, private jwtService: JwtService) {}

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

  @Post('/logout')
  @UseGuards(AuthGuard)
  async logout(@Body() body: { token: string, token_type_hint: string }, @Res() response: Response) {
    try {
      const { token, token_type_hint } = body;
      // Here you would add logic to invalidate the token by deleting it from the database or adding it to a blacklist
      // For example: await this.tokenService.invalidateToken(token, token_type_hint);

      // For now, we'll just simulate the action by verifying the token
      this.jwtService.verify(token, { secret: process.env.JWT_SECRET });

      return response.status(HttpStatus.OK).send();
    } catch (error) {
      throw new HttpException('Logout failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Note: The actual invalidation logic should be implemented in a service, and the token should be verified against a list of valid tokens.
  // The above code is a placeholder to demonstrate the controller logic.
}