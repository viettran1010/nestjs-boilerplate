import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto'; // Updated import
import { User } from 'src/users/user.entity';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private readonly reportsRepository: Repository<Report>,
    private readonly jwtService: JwtService,
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

  createEstimate(query: GetEstimateDto) { // Existing method, no changes required
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

  async login(loginDto: LoginDto) { // Updated parameter type
    const { email, password } = loginDto;
    const report = await this.reportsRepository.findOne({
      where: { email },
    });

    if (!report) {
      throw new BadRequestException('Email or password is not valid');
    }

    const passwordValid = await bcrypt.compare(password, report.encrypted_password); // Updated variable name
    if (!passwordValid) {
      await this.reportsRepository.increment({ email }, 'failed_attempts', 1);
      const failedAttempts = (report.failed_attempts || 0) + 1;
      if (failedAttempts >= 4) {
        await this.reportsRepository.update({ email }, {
          locked_at: new Date(),
          failed_attempts: 0, // Reset failed attempts after locking the user
        });
        throw new BadRequestException('User is locked');
      }
      throw new BadRequestException('Email or password is not valid');
    }

    if (!report.confirmed_at) {
      throw new BadRequestException('User is not confirmed');
    }

    if (report.locked_at && new Date().getTime() - report.locked_at.getTime() < 2 * 60 * 60 * 1000) { // Updated time comparison
      throw new BadRequestException('User is locked');
    }

    await this.reportsRepository.update({ email }, { failed_attempts: 0 });

    const payload = { id: report.id, email: report.email };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
    }); // Generate access token
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
    }); // Generate refresh token

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      resource_owner: 'reports', // Specify the resource owner
      resource_id: report.id,
      expires_in: 86400, // 24 hours in seconds
      token_type: 'Bearer',
      scope: 'report',
      created_at: new Date().getTime() / 1000, // Current time in seconds
      refresh_token_expires_in: 86400, // 24 hours in seconds
    };
  } // End of login method
}