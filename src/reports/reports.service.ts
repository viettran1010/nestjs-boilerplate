import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private jwtService: JwtService,
    private readonly reportsRepository: Repository<Report>,
  ) {}

  create(body: CreateReportDto, user: User) {
  async refreshToken(refreshToken: string, scope: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      if (payload.scope !== scope) {
        throw new BadRequestException('Refresh token is not valid');
      }

      const newAccessToken = this.jwtService.sign(
        { id: payload.id, scope },
        { expiresIn: '24h' },
      );
      const newRefreshToken = this.jwtService.sign(
        { id: payload.id, scope },
        { expiresIn: '24h' },
      );

      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        resource_owner: 'reports',
        resource_id: payload.id,
        expires_in: 86400,
        token_type: 'Bearer',
        scope: scope,
        created_at: new Date(),
        refresh_token_expires_in: 86400,
      };
    } catch (error) {
      throw new BadRequestException('Refresh token is not valid');
    }
  }

    const report = this.reportsRepository.create(body);
    report.user = user;
    return this.reportsRepository.save(report);
  }

  async changeApproval(id: number, approved: boolean) {
    const report = await this.reportsRepository.findOneBy({ id });
    if (!report) {
      throw new NotFoundException('report not found');
    }
    report.approved = approved;
    return await this.reportsRepository.save(report);
  }

  createEstimate(query: GetEstimateDto) {
    return this.reportsRepository
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('maker = :maker', { maker: query.maker })
      .andWhere('model = :model', { model: query.model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: query.lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: query.lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year: query.year })
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage: query.mileage })
      .limit(3)
      .getRawOne();
  }
}