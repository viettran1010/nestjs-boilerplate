import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { ContractsService } from './contracts.service';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  async createContract(@Body() createContractDto: CreateContractDto) {
    const { bank_code, account_number } = createContractDto;
    const isDuplicate = await this.contractsService.checkDuplicateContract(bank_code, account_number);

    if (isDuplicate) {
      throw new HttpException('A contract with the provided bank code and account number already exists', HttpStatus.BAD_REQUEST);
    }

    // Proceed with contract creation logic here
    // ...

    // Optionally, send a success message upon successful creation
    // ...
  }

  // ... other controller methods
}