import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { UpdateContractDto } from './dto/update-contract.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  // ... other route handlers ...
  
  @Patch(':id')
  async updateContract(@Param('id') id: number, @Body() updateContractDto: UpdateContractDto) {
    await this.contractsService.updateContractDetails(id, updateContractDto);
    return { message: 'Contract updated successfully' };
  }

  // ... other route handlers ...
}