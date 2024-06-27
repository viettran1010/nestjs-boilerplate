import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { ContractAction } from '../contract_actions/contract_action.entity';
import { AuditLog } from '../audit_logs/audit_log.entity';
import { Customer } from '../customers/customer.entity';

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'varchar', length: 255 })
  customer_name_katakana: string;

  @Column({ type: 'varchar', length: 255 })
  bank_code: string;

  @Column({ type: 'varchar', length: 255 })
  branch_code: string;

  @Column({ type: 'varchar', length: 255 })
  account_type: string;

  @Column({ type: 'varchar', length: 255 })
  account_number: string;

  @Column()
  opening_date: Date;

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @Column()
  deposit_period: number;

  @Column()
  maturity_date: Date;

  @Column({ type: 'decimal' })
  interest_rate: number;

  @Column({ type: 'varchar', length: 255 })
  status: string;

  @ManyToOne(() => User, user => user.contracts)
  @Column()
  user_id: number;

  @ManyToOne(() => ContractAction, contractAction => contractAction.contracts)
  @Column()
  contract_action_id: number;

  @ManyToOne(() => AuditLog, auditLog => auditLog.contracts)
  @Column()
  audit_log_id: number;

  @ManyToOne(() => Customer, customer => customer.contracts)
  @Column()
  customer_id: number;

  @Column({ type: 'varchar', length: 255 })
  currency_deposited: string;

  @Column({ type: 'decimal' })
  deposit_amount: number;

  @Column()
  deposit_date: Date;

  @OneToMany(() => ContractAction, contractAction => contractAction.contract)
  contractActions: ContractAction[];

  @OneToMany(() => AuditLog, auditLog => auditLog.contract)
  auditLogs: AuditLog[];

  @OneToMany(() => User, user => user.contract)
  users: User[];

  @OneToMany(() => Customer, customer => customer.contract)
  customers: Customer[];
}