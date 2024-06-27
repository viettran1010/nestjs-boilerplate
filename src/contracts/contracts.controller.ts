import { Controller, Get, Param } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractDetailsResponseDto } from './dto/contract-details-response.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get(':id')
  async getContractDetails(@Param('id') id: string): Promise<ContractDetailsResponseDto> {
    return await this.contractsService.getContractDetails(parseInt(id));
  }
}