import { Body, Controller, Post, Param, ParseIntPipe } from '@nestjs/common';
import { ContractsService } from './contracts.service';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  // ... other endpoints ...

  @Post('/:contractId/verify')
  async verifyContract(@Param('contractId', ParseIntPipe) contractId: number) {
    const confirmationMessage = await this.contractsService.initiateContractVerification(contractId);
    return { message: confirmationMessage };
  }
}