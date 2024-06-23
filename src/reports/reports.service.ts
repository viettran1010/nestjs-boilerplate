import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
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

  async resetPasswordConfirm(token: string, password: string) {
    const report = await this.reportsRepository.findOneBy({ reset_password_token: token });
    if (!report) {
      throw new BadRequestException('Token is not valid');
    }

    const tokenExpirationTime = new Date(report.reset_password_sent_at);
    tokenExpirationTime.setHours(tokenExpirationTime.getHours() + 1); // Assuming token is valid for 1 hour

    if (new Date() > tokenExpirationTime) {
      throw new BadRequestException('Token is expired');
    }

    report.reset_password_token = null;
    report.reset_password_sent_at = null;

    const hashedPassword = await hash(password, 10);
    report.password = hashedPassword;

    await this.reportsRepository.save(report);
    return { status: 'success' };
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