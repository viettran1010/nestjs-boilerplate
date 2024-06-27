import {
  Body,
  Controller,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ContractActionsService } from './contract_actions.service';
import { ContractsService } from './contracts.service';
import { ContractDetailsResponseDto, ContractStatus } from './dto/contract-details-response.dto';

class RecordActionDto {
  contract_id: number;
  user_id: number;
  action: string;
}

@Controller('contracts')
export class ContractsController {
  constructor(
    private readonly contractsService: ContractsService,
    private readonly contractActionsService: ContractActionsService
  ) {}

  @Patch('/:id/status')
  @UseGuards(AuthGuard)
  @UseInterceptors(Serialize(ContractDetailsResponseDto))
  async updateContractStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: ContractStatus) {
    await this.contractsService.updateContractStatus(id, status);
    return { message: 'Contract status updated successfully' };
  }

  @Post('/record-action')
  @UseGuards(AuthGuard)
  @UseInterceptors(Serialize(RecordActionDto))
  async recordOfficerAction(@Body() recordActionDto: RecordActionDto) {
    const successMessage = await this.contractActionsService.recordOfficerAction(
      recordActionDto.contract_id,
      recordActionDto.user_id,
      recordActionDto.action,
    );
    return { message: successMessage };
  }
}