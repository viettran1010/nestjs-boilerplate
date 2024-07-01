import {
  Body,
  Controller,
  Param,
  Put,
  UseGuards,
  Session,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { ContractsService } from './contracts.service';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ContractDetailsDto } from './dto/contract-details.dto';
import { AccountType } from './enums/account-type.enum';
import { ContractStatus } from './enums/contract-status.enum';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Put('/:id')
  @UseGuards(AuthGuard)
  async updateContract(
    @Param('id') id: string,
    @Body() updateContractDto: UpdateContractDto,
    @Session() session: any
  ) {
    // Retrieve the "userId" from the session object
    const userId = session.userId;
    // Validate that the "userId" is present
    if (!userId) throw new BadRequestException('User ID is required');

    // Validate that the "id" parameter matches the "id" field in "updateContractDto"
    if (+id !== updateContractDto.id) throw new BadRequestException('Contract ID in the URL and body must match');

    try {
      const updatedContract = await this.contractsService.updateContract(updateContractDto, userId);
      // Transform the updated contract to match the ContractDetailsDto structure
      const contractDetails = this.transformToContractDetailsDto(updatedContract);
      return contractDetails;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  private transformToContractDetailsDto(contract: any): ContractDetailsDto {
    return {
      ...contract,
      account_type: AccountType[contract.account_type as keyof typeof AccountType],
      status: ContractStatus[contract.status as keyof typeof ContractStatus],
      opening_date: new Date(contract.opening_date),
      maturity_date: contract.maturity_date ? new Date(contract.maturity_date) : null,
      user_id: contract.user_id || null,
      contract_action_id: contract.contract_action_id || null,
      customer_id: contract.customer_id || null,
      audit_log_id: contract.audit_log_id || null,
      remarks: contract.remarks || null,
    };
  }
}