import { Controller, Get, Param } from '@nestjs/common';
import { ContractsService } from './contracts.service';

@Controller('contracts')
export class ContractsController {
  constructor(private contractsService: ContractsService) {}

  @Get('/:id/prefill')
  async prefill(@Param('id') id: number) {
    return this.contractsService.prefillContractInformation(id);
  }
}
