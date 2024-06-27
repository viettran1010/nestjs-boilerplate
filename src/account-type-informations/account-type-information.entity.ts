import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { ScheduledDeposit } from '../scheduled-deposits/scheduled-deposit.entity';
import { Contract } from '../contracts/contract.entity';

@Entity()
export class AccountTypeInformation {
  @PrimaryGeneratedColumn()
  id: number;

  // Retain the currencyDeposited field from the current code
  @Column({ type: 'varchar', nullable: true })
  currencyDeposited: string;

  // Combine the ManyToOne relationship from new and current code for User
  // Ensure that the property name is consistent (use 'user' from new code)
  @ManyToOne(() => User, user => user.accountTypeInformations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Include the ManyToOne relationship for Contract from the current code
  @ManyToOne(() => Contract)
  @JoinColumn({ name: 'contract_id' })
  contractId: Contract;

  // Include the OneToMany relationship for ScheduledDeposit from the new code
  @OneToMany(() => ScheduledDeposit, scheduledDeposit => scheduledDeposit.accountTypeInformation)
  scheduledDeposits: ScheduledDeposit[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Retain the deposit_amount and deposit_date fields as they are identical in both versions
  @Column({ type: 'decimal', nullable: true })
  deposit_amount: number;

  @Column({ type: 'timestamp', nullable: true })
  deposit_date: Date;
}
