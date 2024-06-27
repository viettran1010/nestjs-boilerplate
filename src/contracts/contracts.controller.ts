import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { ContractsService } from './contracts.service';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  async create(@Body() createContractDto: CreateContractDto) {
    const { bank_code, account_number } = createContractDto;
    const isDuplicate = await this.contractsService.checkDuplicateContract(bank_code, account_number);

    if (isDuplicate) {
      throw new HttpException('A contract with the same account number and bank code already exists.', HttpStatus.CONFLICT);
    }

    try {
      const contract = await this.contractsService.createContract(createContractDto);
      return {
        status: HttpStatus.CREATED,
        message: 'Contract registered successfully.',
        contract_id: contract.id,
      };
    } catch (error) {
      throw new HttpException('An unexpected error has occurred on the server.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ... other controller methods
}