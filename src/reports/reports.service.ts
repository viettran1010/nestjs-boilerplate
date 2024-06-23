import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { User } from 'src/users/user.entity';
import { Repository, MoreThan } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
  ) {}

  create(body: CreateReportDto, user: User) {
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

  async resetPasswordRequest(email: string): Promise<void> {
    const report = await this.reportsRepository.findOneBy({ email });
    if (!report) {
      // If no report is found, we simply return to prevent email enumeration
      return;
    }

    // Generate a secure random token
    const resetToken = randomBytes(32).toString('hex');
    report.reset_password_token = resetToken;
    report.reset_password_sent_at = new Date();

    // Save the updated report record
    await this.reportsRepository.save(report);

    // TODO: Send email with the reset token
  }
}