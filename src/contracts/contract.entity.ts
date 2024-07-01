import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { AccountTypeInformation } from '../account_type_informations/account_type_information.entity';
import { ContractAction } from '../contract_actions/contract_action.entity'; // Correct the path if it's wrong
import { AuditLog } from '../audit_logs/audit_log.entity';
import { Customer } from '../customers/customer.entity';
import { SuccessMessage } from '../success_messages/success_message.entity';
import { ErrorMessage } from '../error_messages/error_message.entity';

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

  @Column()
  status: string;

  @ManyToOne(() => User, user => user.contracts)
  user: User;

  @ManyToOne(() => ContractAction, contractAction => contractAction.contracts)
  contractAction: ContractAction;

  @ManyToOne(() => AuditLog, auditLog => auditLog.contract)
  auditLog: AuditLog;

  @OneToOne(() => Customer, customer => customer.contract)
  customer: Customer;

  @OneToMany(() => ContractAction, contractAction => contractAction.contract)
  contractActions: ContractAction[]; // Ensure ContractAction has a 'contract' property

  @OneToMany(() => User, user => user.contract)
  users: User[];

  @OneToMany(() => AuditLog, auditLog => auditLog.contract)
  auditLogs: AuditLog[];

  @Column({ nullable: true }) // Ensure the column names match the related entities
  user_id?: number;

  @Column({ nullable: true })
  contract_action_id?: number;

  @Column({ nullable: true })
  customer_id?: number;

  @Column({ nullable: true })
  audit_log_id?: number;

  @ManyToOne(() => AccountTypeInformation, accountTypeInformation => accountTypeInformation.contracts)
  @JoinColumn({ name: 'account_type_information_id' })
  accountTypeInformation: AccountTypeInformation;

  @Column({ nullable: true })
  account_type_information_id?: number;

  @Column({ type: 'varchar', length: 3, nullable: true })
  currency_deposited?: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  deposit_amount?: number;

  @Column({ type: 'date', nullable: true })
  deposit_date?: Date;

  @ManyToOne(() => SuccessMessage, successMessage => successMessage.contracts)
  @JoinColumn({ name: 'success_message_id' })
  successMessage: SuccessMessage;

  @ManyToOne(() => ErrorMessage, errorMessage => errorMessage.contracts)
  @JoinColumn({ name: 'error_message_id' })
  errorMessage: ErrorMessage;

  @OneToOne(() => Customer, customer => customer.contract)
  @JoinColumn()
  customerContract: Customer;
}