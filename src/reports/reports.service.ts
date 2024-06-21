import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { User } from 'src/users/user.entity';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportsRepository: Repository<Report>,
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

  async logout(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      // TODO: Invalidate or blacklist the token
      // This is a placeholder for the logic to invalidate or blacklist the token
      // You should replace this with the actual implementation, which might involve
      // interacting with the database or a cache to store invalidated tokens.
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async login(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = await this.reportsRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Email or password is not valid');
    }

    const passwordValid = await bcrypt.compare(password, user.encrypted_password);
    if (!passwordValid) {
      await this.reportsRepository.increment({ email }, 'failed_attempts', 1);
      const failedAttempts = user.failed_attempts + 1;
      if (failedAttempts >= 4) {
        await this.reportsRepository.update({ email }, {
          locked_at: new Date(),
          failed_attempts: 0,
        });
        throw new NotFoundException('User is locked');
      }
      throw new NotFoundException('Email or password is not valid');
    }

    if (!user.confirmed_at) {
      throw new NotFoundException('User is not confirmed');
    }

    if (user.locked_at && new Date() - user.locked_at < 2 * 60 * 60 * 1000) {
      throw new NotFoundException('User is locked');
    }

    await this.reportsRepository.update({ email }, { failed_attempts: 0 });

    const payload = { id: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '24h',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      resource_owner: 'reports',
      resource_id: user.id,
      expires_in: 86400,
      token_type: 'Bearer',
      scope: 'report',
      created_at: new Date(),
      refresh_token_expires_in: 86400,
    };
  }
}