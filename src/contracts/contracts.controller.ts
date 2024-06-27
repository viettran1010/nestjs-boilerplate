import {
  Controller,
  Patch,
  Param,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';

@Controller('contracts')
export class ContractsController {
  constructor(private contractsService: ContractsService) {}

  @Patch('/:id/currency')
  @UseInterceptors(SerializeInterceptor)
  async updateCurrencyDeposited(
    @Param('id') id: number,
    @Body('currencyDeposited') currencyDeposited: string
  ) {
    await this.contractsService.updateCurrencyDeposited(id, currencyDeposited);
    return { message: 'Currency deposited updated successfully' };
  }

  // ... other methods ...
}