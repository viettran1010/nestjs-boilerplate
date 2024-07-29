import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './contract.entity';
import { AuditLog } from '../audit_logs/audit_log.entity';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Contract, AuditLog])],
  controllers: [ContractsController],
  providers: [ContractsService],
})
export class ContractsModule {}