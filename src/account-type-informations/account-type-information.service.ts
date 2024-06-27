import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountTypeInformation } from './account-type-information.entity';
import { User } from '../users/user.entity';
import { ScheduledDeposit } from '../scheduled-deposits/scheduled-deposit.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AccountTypeInformationService {
  constructor(
    @InjectRepository(AccountTypeInformation)
    private accountTypeInformationRepository: Repository<AccountTypeInformation>,
    @InjectRepository(ScheduledDeposit)
    private scheduledDepositRepository: Repository<ScheduledDeposit>,
    private usersService: UsersService,
  ) {}

  async validateAndSaveAccountTypeInformation(deposit_amount: number, deposit_date: Date, user_id: number): Promise<string> {
    // 1. Use "UsersService" to check if the "user_id" corresponds to an existing user.
    const user = await this.usersService.findOne(user_id);
    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }

    // 2. Validate that "deposit_amount" is a positive number.
    if (deposit_amount <= 0) {
      throw new Error('ValidationException: Deposit amount must be positive');
    }

    // 3. Validate that "deposit_date" is in the correct format and represents a valid future date.
    if (!(deposit_date instanceof Date) || isNaN(deposit_date.getTime()) || deposit_date <= new Date()) {
      throw new Error('ValidationException: Deposit date is invalid or formatted incorrectly');
    }

    // 4. Create a new instance of "AccountTypeInformation" and save it.
    const accountTypeInformation = this.accountTypeInformationRepository.create({
      deposit_amount,
      deposit_date,
    });
    await this.accountTypeInformationRepository.save(accountTypeInformation);

    // 5. Create a new "ScheduledDeposit" instance with the appropriate values and save it.
    const scheduledDeposit = this.scheduledDepositRepository.create({
      account_type_information_id: accountTypeInformation.id,
      scheduled_date: deposit_date,
      status: 'pending',
    });
    await this.scheduledDepositRepository.save(scheduledDeposit);

    // 6. Return a success message upon completion.
    return 'Account type information and scheduled deposit have been saved successfully';
  }
}