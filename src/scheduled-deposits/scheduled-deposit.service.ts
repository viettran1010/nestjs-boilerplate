import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountTypeInformation } from '../account-type-informations/account-type-information.entity';
import { Repository } from 'typeorm';
import { ScheduledDeposit } from './scheduled-deposit.entity';

@Injectable()
export class ScheduledDepositService {
  constructor(
    @InjectRepository(ScheduledDeposit)
    private scheduledDepositRepository: Repository<ScheduledDeposit>,
    @InjectRepository(AccountTypeInformation)
    private accountTypeInformationRepository: Repository<AccountTypeInformation>,
  ) {}

  async scheduleRecurringDeposit(accountTypeInformationId: number, scheduledDate: Date): Promise<ScheduledDeposit[]> {
    const accountTypeInformation = await this.accountTypeInformationRepository.findOneBy({ id: accountTypeInformationId });
    if (!accountTypeInformation) {
      throw new Error(`AccountTypeInformation with ID ${accountTypeInformationId} not found`);
    }

    // Assuming the recurrence pattern is monthly on the same date
    const scheduledDeposits: ScheduledDeposit[] = [];
    const currentDate = new Date();
    let nextScheduledDate = new Date(scheduledDate);

    while (nextScheduledDate > currentDate) {
      // Create a new instance of "ScheduledDeposit"
      const scheduledDeposit = this.scheduledDepositRepository.create({
        accountTypeInformation: accountTypeInformation,
        scheduled_date: nextScheduledDate,
        status: 'scheduled',
      });

      // Save the new "ScheduledDeposit" to the database
      await this.scheduledDepositRepository.save(scheduledDeposit);
      scheduledDeposits.push(scheduledDeposit);

      // Calculate the next occurrence of the recurring deposit
      nextScheduledDate.setMonth(nextScheduledDate.getMonth() + 1);
    }

    // Return the list of scheduled deposit dates and their statuses
    return scheduledDeposits;
  }
}