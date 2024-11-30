import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { IsInt, IsString, IsDate, IsOptional } from 'class-validator';
import { User } from '../users/user.entity';
import { ContractAction } from '../contract_actions/contract_action.entity'; // Correct path
import { AuditLog } from '../audit_logs/audit_log.entity';
import { Customer } from '../customers/customer.entity';
import { AccountType } from '../account_types/account_type.enum'; // Correct path

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsDate()
  created_at: Date;

  @Column()
  @IsDate()
  updated_at: Date;

  @Column()
  @IsString()
  customer_name_katakana: string;

  @Column()
  @IsString()
  bank_code: string;

  @Column()
  @IsString()
  branch_code: string;

  @Column()
  @IsString()
  account_type: string;

  @Column()
  @IsString()
  account_number: string;

  @Column()
  @IsDate()
  opening_date: Date;

  @Column({ nullable: true })
  @IsOptional()
  remarks?: string;

  @Column({ nullable: true })
  @IsOptional()
  deposit_period?: number;

  @Column({ nullable: true })
  @IsDate()
  maturity_date?: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  @IsOptional()
  interest_rate?: number;

  @Column()
  @IsString()
  status: string;

  @ManyToOne(() => User, user => user.contracts)
  @IsInt()
  user: User; // Correct property name 'contract'

  @ManyToOne(() => ContractAction, contractAction => contractAction.contracts)
  @IsInt()
  contractAction: ContractAction;

  @ManyToOne(() => AuditLog, auditLog => auditLog.contracts)
  @IsInt()
  // Removed incorrect relation to AuditLog

  @ManyToOne(() => Customer, customer => customer.contracts)
  customer: Customer; // Correct property name 'contract'
  customer: Customer;

  @OneToMany(() => ContractAction, contractAction => contractAction.contract)
  contractActions: ContractAction[]; // Ensure ContractAction has 'contract' property
  contractActions: ContractAction[];

  @OneToMany(() => User, user => user.contract)
  @IsInt()
  users: User[];

  @OneToMany(() => AuditLog, auditLog => auditLog.contract)
  // Removed incorrect relation to AuditLog
  auditLogs: AuditLog[];

  @Column({ nullable: true })
  @IsOptional()
  user_id?: number;

  @Column({ nullable: true })
  @IsOptional()
  contract_action_id?: number;

  @Column({ nullable: true })
  @IsOptional()
  customer_id?: number;

  @Column({ nullable: true })
  @IsOptional()
  audit_log_id?: number;

  @OneToOne(() => Customer, customer => customer.contract)
  @IsInt()
  customerContract: Customer;
}