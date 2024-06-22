import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Report } from './report.entity';

const scrypt = promisify(_scrypt);

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

  async signup(email: string, password: string) {
    // Check if the email is already taken
    const existingReport = await this.reportsRepository.findOneBy({ email });
    if (existingReport) {
      throw new BadRequestException('Email is already taken');
    }

    // Generate a confirmation token
    const confirmationToken = randomBytes(32).toString('hex');

    // Hash the password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashedPassword = `${salt}.${hash.toString('hex')}`;

    // Create a new report record
    const report = this.reportsRepository.create({
      email,
      encrypted_password: hashedPassword,
      confirmation_token: confirmationToken,
      confirmed_at: null,
    });

    // Save the new report record to the database
    await this.reportsRepository.save(report);

    // Send a confirmation email
    await this.sendConfirmationEmail(email, confirmationToken);

    return report;
  }

  private async sendConfirmationEmail(email: string, confirmationToken: string) {
    // TODO: Implement the email sending logic using EmailService
    // This is a placeholder for the actual email service implementation
  }
}