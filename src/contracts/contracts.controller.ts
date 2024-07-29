import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  Get,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ContractActionsService } from './contract_actions.service';
import { ContractsService } from './contracts.service';
import { ContractDetailsResponseDto } from './dto/contract-details-response.dto';

class RecordActionDto {
  contract_id: number;
  user_id: number;
  action: string;
}

@Serialize(ContractDetailsResponseDto)
@Controller('contracts')
export class ContractsController {
  constructor(
    private readonly contractActionsService: ContractActionsService,
    private readonly contractsService: ContractsService,
  ) {}

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

  @Get('/:id')
  async getContractDetails(@Param('id') id: string) {
    const contractId = parseInt(id);
    if (isNaN(contractId)) {
      throw new BadRequestException('Invalid contract ID');
    }
    return this.contractsService.getContractDetails(contractId);
  }
}