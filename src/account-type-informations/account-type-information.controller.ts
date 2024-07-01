import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { AccountTypeInformationService } from './account-type-information.service';

@Controller('account-type-information')
export class AccountTypeInformationController {
  constructor(private readonly accountTypeInformationService: AccountTypeInformationService) {}

  @Post()
  async createAccountTypeInformation(@Body() body: { deposit_amount: number; deposit_date: Date; user_id: number }) {
    try {
      const accountTypeInformation = await this.accountTypeInformationService.validateAndSaveAccountTypeInformation(
        body.deposit_amount,
        body.deposit_date,
        body.user_id,
      );
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Account type information and scheduled deposit have been saved successfully.',
      };
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }
}