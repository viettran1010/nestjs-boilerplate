import {
  Body,
  Controller,
  Get,
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
    const userId = session.userId;
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    if (+id !== updateContractDto.id) {
      throw new BadRequestException('Contract ID in the URL and body must match');
    }

    try {
      const updatedContract = await this.contractsService.updateContract(updateContractDto, userId);
      return updatedContract;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async getContractDetails(@Param('id') id: string): Promise<ContractDetailsDto> {
    const contractId = parseInt(id);
    if (isNaN(contractId)) {
      throw new BadRequestException('Invalid contract ID');
    }

    const contract = await this.contractsService.findContractById(contractId);
    if (!contract) {
      throw new NotFoundException('Contract not found');
    }

    return contract; // Assuming that Contract entity is compatible with ContractDetailsDto
  }
}