import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AccountTypeInformation } from '../account-type-informations/account-type-information.entity';

@Entity({ name: 'scheduled_deposits' })
export class ScheduledDeposit {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AccountTypeInformation, accountTypeInformation => accountTypeInformation.scheduledDeposits)
  @JoinColumn({ name: 'account_type_information_id' })
  account_type_information: AccountTypeInformation;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  scheduled_date: Date;

  @Column({ type: 'varchar', nullable: true })
  status: string;
}