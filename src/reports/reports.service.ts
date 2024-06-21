import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Report } from './report.entity';

@Injectable()
export class ReportsService {
  private readonly scrypt = promisify(_scrypt);

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

  async validateUser(email: string, password: string): Promise<Report | null> {
    const report = await this.reportsRepository.findOne({
      where: { email },
    });

    if (!report || !report.encrypted_password) {
      return null;
    }

    const [salt, storedHash] = report.encrypted_password.split('.');
    const hash = (await this.scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      report.failed_attempts = (report.failed_attempts || 0) + 1;
      if (report.failed_attempts >= 4) {
        report.locked_at = new Date();
        report.failed_attempts = 0;
      }
      await this.reportsRepository.save(report);
      throw new BadRequestException('invalid credentials');
    }

    if (report.locked_at) {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
      if (report.locked_at > twoHoursAgo) {
        throw new BadRequestException('User is locked');
      }
    }

    report.failed_attempts = 0;
    await this.reportsRepository.save(report);

    return report;
  }
}