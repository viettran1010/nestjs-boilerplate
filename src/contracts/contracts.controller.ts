import { Body, Controller, Param, Put } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { UpdateAccountTypeDto } from './dtos/update-account-type.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private contractsService: ContractsService) {}

  @Put(':contract_id/account-type-information')
  async updateAccountType(
    @Param('contract_id') contract_id: number,
    @Body() updateAccountTypeDto: UpdateAccountTypeDto
  ) {
    return await this.contractsService.updateAccountTypeInformation(
      contract_id,
      updateAccountTypeDto.deposit_amount,
      updateAccountTypeDto.deposit_date,
      updateAccountTypeDto.user_id
    );
  }

  // Other controller methods...
}