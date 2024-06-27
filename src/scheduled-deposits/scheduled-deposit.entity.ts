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

  @ManyToOne(() => AccountTypeInformation)
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

  static scheduleDeposit(accountTypeInformation: AccountTypeInformation, deposit_date: Date) {
    const scheduledDeposit = new ScheduledDeposit();
    scheduledDeposit.account_type_information = accountTypeInformation;
    scheduledDeposit.scheduled_date = deposit_date;
    scheduledDeposit.status = 'pending';
    // Here you would typically save the entity using the repository
    // For this example, we'll assume it's saved and return the instance
    return scheduledDeposit;
  }
}