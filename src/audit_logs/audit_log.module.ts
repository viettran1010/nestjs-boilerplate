import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLogService } from './audit_log.service';
import { AuditLogController } from './audit_log.controller';
import { AuditLog } from './audit_log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditLog])],
  controllers: [AuditLogController],
  providers: [AuditLogService],
})
export class AuditLogModule {}