import {
  Controller,
  Patch,
  Param,
  Body,
  UseInterceptors
} from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { SerializerInterceptor } from '../interceptors/serialize.interceptor';
import { UpdateCurrencyDepositedDto } from './dto/update-currency-deposited.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private contractsService: ContractsService) {}

  @Patch('/:id/currency')
  @UseInterceptors(SerializerInterceptor)
  async updateCurrencyDeposited(
    @Param('id') id: string,
    @Body() updateCurrencyDepositedDto: UpdateCurrencyDepositedDto
  ) {
    await this.contractsService.updateCurrencyDeposited(parseInt(id), updateCurrencyDepositedDto.currencyDeposited);
    return { message: 'Currency deposited updated successfully' };
  }

  // ... other methods ...
}