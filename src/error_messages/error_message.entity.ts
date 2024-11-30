import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AuditLog } from '../audit_logs/audit_log.entity';

@Entity()
export class ErrorMessage {
  @PrimaryGeneratedColumn()
  id: number;

  // ... other columns

  @ManyToOne(() => AuditLog, auditLog => auditLog.errorMessages)
  auditLog: AuditLog;
}