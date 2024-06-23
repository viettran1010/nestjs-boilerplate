import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const report = await this.reportsRepository.findOne({
      where: { email },
    });

    if (!report) {
      throw new NotFoundException('Email or password is not valid');
    }

    const passwordValid = await bcrypt.compare(password, report.encrypted_password);
    if (!passwordValid) {
      await this.reportsRepository.increment({ email }, 'failed_attempts', 1);
      const failedAttempts = report.failed_attempts + 1;
      if (failedAttempts >= 4) {
        await this.reportsRepository.update({ email }, {
          locked_at: new Date(),
          failed_attempts: 0,
        });
        throw new NotFoundException('User is locked');
      }
      throw new NotFoundException('Email or password is not valid');
    }

    if (report.locked_at && new Date() - report.locked_at < 2 * 60 * 60 * 1000) {
      throw new NotFoundException('User is locked');
    }

    await this.reportsRepository.update({ email }, { failed_attempts: 0 });

    const payload = { id: report.id, email };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '24h' });

    return { accessToken, refreshToken };
  }

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
}