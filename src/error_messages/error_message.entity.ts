import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Contract } from '../contracts/contract.entity';
import { AuditLog } from '../audit_logs/audit_log.entity';

@Entity('error_messages')
export class ErrorMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;

  @Column()
  error_icon: string;

  @Column()
  error_message: string;

  @Column()
  error_detail: string;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @Column()
  action_taken: string;

  @ManyToOne(() => Contract, contract => contract.error_messages)
  @JoinColumn({ name: 'contract_id' })
  contract: Contract;

  @ManyToOne(() => User, user => user.error_messages)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => AuditLog, auditLog => auditLog.errorMessages)
  @JoinColumn({ name: 'audit_log_id' })
  auditLog: AuditLog;
}