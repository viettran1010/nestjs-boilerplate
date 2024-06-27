import { Body, Controller, Patch, Param, NotFoundException, BadRequestException } from '@nestjs/common';
import { ContractsService } from './contracts.service';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Patch('/:id/currency')
  async updateContractCurrency(@Param('id') id: string, @Body('currency_deposited') currency_deposited: string) {
    try {
      return await this.contractsService.updateCurrency(parseInt(id), currency_deposited);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      // Handle other possible errors that could occur during the update
      throw new BadRequestException('Failed to update the contract currency.');
    }
  }
}