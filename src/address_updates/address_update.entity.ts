import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { IsEnum } from 'class-validator';
import { User } from '../users/user.entity';
import { Customer } from '../customers/customer.entity';
import { AuditLog } from '../audit_logs/audit_log.entity';

export enum AddressUpdateStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity()
export class AddressUpdate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ nullable: true })
  file_attachment: string;

  @Column({ type: 'timestamp', nullable: true })
  date_to_start_converting: Date;

  @Column({ type: 'timestamp', nullable: true })
  date_of_end_converting: Date;

  @Column()
  @IsEnum(AddressUpdateStatus)
  status: AddressUpdateStatus;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => AuditLog)
  @JoinColumn({ name: 'audit_log_id' })
  auditLog: AuditLog;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ nullable: true })
  address_update_file: string;

  @OneToMany(() => User, user => user.addressUpdates)
  users: User[];

  @OneToMany(() => Customer, customer => customer.addressUpdates)
  customers: Customer[];

  @OneToMany(() => AuditLog, auditLog => auditLog.addressUpdates)
  auditLogs: AuditLog[];
}