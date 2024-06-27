import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduledDeposit } from './scheduled-deposit.entity';

@Injectable()
export class ScheduledDepositService {
  constructor(
    @InjectRepository(ScheduledDeposit)
    private scheduledDepositRepository: Repository<ScheduledDeposit>,
  ) {}

  async scheduleDeposit(accountTypeInformationId: number, deposit_date: Date): Promise<ScheduledDeposit> {
    // 1. Create a new instance of "ScheduledDeposit"
    const scheduledDeposit = this.scheduledDepositRepository.create({
      account_type_information_id: accountTypeInformationId,
      scheduled_date: deposit_date,
      status: 'pending',
    });

    // 2. Save the new "ScheduledDeposit" to the database
    await this.scheduledDepositRepository.save(scheduledDeposit);

    // 3. Return the newly created "ScheduledDeposit" entity
    return scheduledDeposit;
  }
}