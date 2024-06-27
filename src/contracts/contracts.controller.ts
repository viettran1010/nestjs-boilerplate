import { Body, Controller, Param, Put, Session } from '@nestjs/common';
import { ContractService } from './contract.service';
import { UpdateAccountTypeInformationDto } from './dto/update-account-type-information.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private contractService: ContractService) {}

  // ... other endpoints ...

  @Put('/:contractId/account-type-information')
  async updateAccountTypeInformation(
    @Param('contractId') contractId: string,
    @Body() updateAccountTypeInformationDto: UpdateAccountTypeInformationDto,
    @Session() session: any
  ) {
    const userId = session.userId;
    return await this.contractService.updateAccountTypeInformation(
      parseInt(contractId),
      updateAccountTypeInformationDto.depositAmount,
      new Date(updateAccountTypeInformationDto.depositDate),
      userId
    );
  }
}