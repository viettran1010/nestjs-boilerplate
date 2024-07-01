import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Customer } from '../customers/customer.entity';
import { AuditLog } from '../audit_logs/audit_log.entity';

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
  status: string;

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

  @OneToMany(() => User, user => user.addressUpdate)
  users: User[];

  @OneToMany(() => Customer, customer => customer.addressUpdate)
  customers: Customer[];

  @OneToMany(() => AuditLog, auditLog => auditLog.addressUpdate)
  auditLogs: AuditLog[];
}