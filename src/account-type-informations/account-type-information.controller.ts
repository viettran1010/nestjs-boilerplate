import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { AccountTypeInformationService } from './account-type-information.service';

@Controller('account-type-informations')
export class AccountTypeInformationController {
  constructor(private readonly accountTypeInformationService: AccountTypeInformationService) {}

  @Post()
  async createAccountTypeInformation(@Body() body: { deposit_amount: number; deposit_date: Date; user_id: number }) {
    try {
      const successMessage = await this.accountTypeInformationService.validateAndSaveAccountTypeInformation(
        body.deposit_amount,
        body.deposit_date,
        body.user_id,
      );
      return {
        statusCode: HttpStatus.CREATED,
        message: successMessage,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}