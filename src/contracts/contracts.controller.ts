import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ContractActionsService } from './contract_actions.service';

class RecordActionDto {
  contract_id: number;
  user_id: number;
  action: string;
}

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractActionsService: ContractActionsService) {}

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