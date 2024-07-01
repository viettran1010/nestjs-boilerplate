import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Contract } from '../contracts/contract.entity';
import { AuditLog } from '../audit_logs/audit_log.entity'; // Assuming the import for AuditLog

@Entity()
export class SuccessMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column()
  message: string;

  @Column({ nullable: true })
  detail: string;

  @Column({ type: 'timestamp', nullable: true })
  displayed_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  closed_at: Date;

  @ManyToOne(() => User, user => user.successMessages)
  user: User;

  @ManyToOne(() => AuditLog, auditLog => auditLog.successMessages)
  @JoinColumn({ name: 'audit_log_id' })
  auditLog: AuditLog;

  @ManyToOne(() => Contract, contract => contract.successMessages)
  contract: Contract;

  @Column({ nullable: true })
  contract_id: number;
}