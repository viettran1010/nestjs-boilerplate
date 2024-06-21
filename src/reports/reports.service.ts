import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { promisify } from 'util';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
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
    const report = await this.reportsRepository.findOne({
      where: { email },
    });

    if (!report) {
      // If no report is found, return immediately to prevent email enumeration
      return;
    }

    // Generate a secure random token
    const randomBytesPromise = promisify(randomBytes);
    const tokenBuffer = await randomBytesPromise(32);
    const passwordResetToken = tokenBuffer.toString('hex');

    // Set the token and timestamp in the report entity
    report.reset_password_token = passwordResetToken;
    report.reset_password_sent_at = new Date();

    // Save the updated report entity
    await this.reportsRepository.save(report);

    // TODO: Implement EmailService.sendEmail method to send the reset password email
    // EmailService.sendEmail(report.email, passwordResetToken, 'URL_FOR_RESET');
  }
}