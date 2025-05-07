import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { ScheduledDeposit } from '../scheduled-deposits/scheduled-deposit.entity';
import { Contract } from '../contracts/contract.entity';

@Entity()
export class AccountTypeInformation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  currencyDeposited: string;

  @ManyToOne(() => User, user => user.accountTypeInformation)
  @JoinColumn({ name: 'user_id' }) user: User;

  @ManyToOne(() => Contract)
  @JoinColumn({ name: 'contract_id' })
  contractId: Contract;

  @OneToMany(() => ScheduledDeposit, scheduledDeposit => scheduledDeposit.account_type_information)
  scheduledDeposits: ScheduledDeposit[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'decimal', nullable: true })
  deposit_amount: number;

  @Column({ type: 'timestamp', nullable: true })
  deposit_date: Date;
}