import {
  Body,
  Controller,
  Param,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { UpdateContractStatusDto } from './dtos/update-contract-status.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private contractsService: ContractsService) {}

  // ... other route handlers ...

  @Patch('/:id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateContractStatusDto: UpdateContractStatusDto
  ) {
    const contract = await this.contractsService.updateContractStatus(
      parseInt(id),
      updateContractStatusDto.status
    );
    if (!contract) {
      throw new NotFoundException('Contract not found');
    }
    return contract;
  }
}