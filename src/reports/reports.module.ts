import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { AuthService } from '../users/auth.service';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  controllers: [ReportsController], // Keep existing controllers
  providers: [ReportsService, AuthService], // Add AuthService to the providers array
})
export class ReportsModule {}