import {
  Body,
  ParseEnumPipe,
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
import { ContractDetailsDto } from './dto/contract-details.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

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
    const userId: number = session.userId;
    // Validate that the "userId" is present
    if (!userId) throw new BadRequestException('User ID is required');

    // Validate that the "id" parameter matches the "id" field in "updateContractDto"
    if (+id !== updateContractDto.id) throw new BadRequestException('Contract ID in the URL and body must match');

    try {
      const updatedContract: ContractDetailsDto = await this.contractsService.updateContract(updateContractDto, userId);
      return updatedContract;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }
}