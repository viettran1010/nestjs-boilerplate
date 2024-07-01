import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { IsString, IsCurrency } from 'class-validator';
import { ContractAction } from '../actions/contract_action.entity';
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

  @Column()
  status: string;

  @ManyToOne(() => User, user => user.contracts)
  @IsString()
  @IsCurrency()
  @Column({ type: 'varchar', length: 3 })
  currency_deposited: string;

  @ManyToOne(() => User, user => user.contract)
  user: User;

  @ManyToOne(() => Customer, customer => customer.contract)
  customer: Customer;

  @OneToMany(() => ContractAction, contractAction => contractAction.contract)
  contractActions: ContractAction[];

  @OneToMany(() => User, user => user.contract)
  users: User[];

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