import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { ReportsController } from './reports.controller';
import { AuthService } from '../users/auth.service'; // Added AuthService import
import { ReportsService } from './reports.service';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  controllers: [ReportsController],
  providers: [
    ReportsService,
    AuthService, // Added AuthService to the providers array
  ],
})
export class ReportsModule {}