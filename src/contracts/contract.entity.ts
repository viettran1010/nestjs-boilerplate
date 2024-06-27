import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { ContractAction } from '../contract_actions/contract_action.entity';
import { AuditLog } from '../audit_logs/audit_log.entity';
import { Customer } from '../customers/customer.entity';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  customer_name_katakana: string;

  @Column()
  bank_code: string;

  @Column()
  branch_code: string;

  @Column()
  account_type: string;

  @Column()
  account_number: string;

  @Column({ type: 'string', nullable: true })
  currency_deposited: string;

  @Column({ type: 'float', nullable: true })
  deposit_amount: number;

  @Column({ type: 'date', nullable: true })
  deposit_date: Date;

  @Column()
  opening_date: Date;

  @Column({ nullable: true })
  remarks?: string;

  @Column({ nullable: true })
  deposit_period?: number;

  @Column({ nullable: true })
  maturity_date?: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  interest_rate?: number;

  @Column()
  status: string;

  @ManyToOne(() => User, user => user.contracts)
  user: User;

  @ManyToOne(() => ContractAction, contractAction => contractAction.contracts)
  contractAction: ContractAction;

  @ManyToOne(() => AuditLog, auditLog => auditLog.contracts)
  auditLog: AuditLog;

  @ManyToOne(() => Customer, customer => customer.contracts)
  customer: Customer;

  @OneToMany(() => ContractAction, contractAction => contractAction.contract)
  contractActions: ContractAction[];

  @OneToMany(() => User, user => user.contract)
  users: User[];

  @OneToMany(() => AuditLog, auditLog => auditLog.contract)
  auditLogs: AuditLog[];

  @Column({ nullable: true })
  user_id?: number;

  @Column({ nullable: true })
  contract_action_id?: number;

  @Column({ nullable: true })
  customer_id?: number;

  @Column({ nullable: true })
  audit_log_id?: number;

  @OneToOne(() => Customer, customer => customer.contract)
  customerContract: Customer;
}