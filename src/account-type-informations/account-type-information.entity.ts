import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { ScheduledDeposit } from '../scheduled-deposits/scheduled-deposit.entity';
import { Contract } from '../contracts/contract.entity';
import { BadRequestException } from '@nestjs/common';

@Entity()
export class AccountTypeInformation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  currencyDeposited: string;

  @ManyToOne(() => User, user => user.accountTypeInformations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Contract)
  @JoinColumn({ name: 'contract_id' })
  contractId: Contract;

  @OneToMany(() => ScheduledDeposit, scheduledDeposit => scheduledDeposit.accountTypeInformation)
  scheduledDeposits: ScheduledDeposit[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'decimal', nullable: true })
  deposit_amount: number;

  @Column({ type: 'timestamp', nullable: true })
  deposit_date: Date;

  static async validateAndCreate(deposit_amount: number, deposit_date: string, user_id: number) {
    const usersService = new UsersService(); // This should be injected, but for the purpose of this example, we're instantiating it directly.
    const user = await usersService.findOne(user_id);

    if (!user) {
      throw new BadRequestException('Invalid user_id, user does not exist.');
    }

    if (deposit_amount <= 0) {
      throw new BadRequestException('The deposit amount must be positive.');
    }

    const depositDate = new Date(deposit_date);
    if (isNaN(depositDate.getTime()) || depositDate < new Date()) {
      throw new BadRequestException('The deposit date is invalid or formatted incorrectly.');
    }

    const accountTypeInformation = new AccountTypeInformation();
    accountTypeInformation.deposit_amount = deposit_amount;
    accountTypeInformation.deposit_date = depositDate;
    accountTypeInformation.user = user;

    // Here you would typically save the entity using the repository
    // For this example, we'll assume it's saved and return the instance

    return accountTypeInformation;
  }
}