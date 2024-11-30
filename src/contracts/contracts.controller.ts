import {
  Body,
  Controller,
  Param,
  Patch,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { UpdateContractStatusDto } from './dtos/update-contract-status.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private contractsService: ContractsService) {}

  // ... other route handlers ...

  @Patch('/:id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateContractStatusDto: UpdateContractStatusDto
  ) {
    updateContractStatusDto.id = id;
    const contract = await this.contractsService.updateContractStatus(updateContractStatusDto);
    if (!contract) {
      throw new NotFoundException('Contract not found');
    }
    return contract;
  }
}