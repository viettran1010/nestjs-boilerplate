import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { SuccessMessage } from '../success_messages/success_message.entity';
import { ErrorMessage } from '../error_messages/error_message.entity';
import { ContractAction } from '../actions/contract_action.entity'; // Updated import path
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

  @OneToMany(() => SuccessMessage, successMessage => successMessage.contract_id) // Updated relationship
  successMessages: SuccessMessage[];

  @OneToMany(() => ErrorMessage, errorMessage => errorMessage.contract_id) // Updated relationship
  errorMessages: ErrorMessage[];

  @Column({ nullable: true })
  currency_deposited?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  deposit_amount?: number;

  @Column({ type: 'date', nullable: true })
  deposit_date?: Date;

  @Column()
  status: string;

  @ManyToOne(() => User, user => user.contract) // Updated relationship
  user: User;

  @ManyToOne(() => ContractAction, contractAction => contractAction.contract_id) // Updated relationship
  contractAction: ContractAction;

  @ManyToOne(() => AuditLog, auditLog => auditLog.contract) // Updated relationship
  auditLog: AuditLog;

  @ManyToOne(() => Customer, customer => customer.contract) // Updated relationship
  customer: Customer;

  @OneToMany(() => ContractAction, contractAction => contractAction.contract_id) // Updated relationship
  contractActions: ContractAction[];

  @OneToMany(() => AuditLog, auditLog => auditLog.contract_id) // Updated relationship
  auditLogs: AuditLog[];

  @Column({ nullable: true })
  user_id?: number;

  @Column({ nullable: true })
  contract_action_id?: number;

  @Column({ nullable: true })
  customer_id?: number;

  @Column({ nullable: true })
  audit_log_id?: number;

  @OneToOne(() => Customer, customer => customer.contract) // Retained relationship
  customerContract: Customer;
}