import { Body, Controller, Post, HttpStatus, HttpCode, ConflictException } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { ContractsService } from './contracts.service';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createContract(@Body() createContractDto: CreateContractDto) {
    try {
      const contract = await this.contractsService.createContract(createContractDto);
      return {
        status: HttpStatus.CREATED,
        message: 'Contract registered successfully.',
        contract_id: contract.id,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        return {
          status: HttpStatus.CONFLICT,
          message: error.message,
        };
      }
      throw error;
    }
  }
}