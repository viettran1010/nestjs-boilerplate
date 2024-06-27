import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post('/register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async registerContract(@Body() createContractDto: CreateContractDto) {
    try {
      // Validate the contract registration fields
      this.contractsService.validateContractRegistration(createContractDto);

      // Create the contract if validation passes
      const contract = await this.contractsService.createContract(createContractDto);

      // Return success response
      return {
        status: 'success',
        message: 'Contract registered successfully',
        data: contract,
      };
    } catch (error) {
      // Handle errors and return error response
      return {
        status: 'error',
        message: error.message,
      };
    }
  }
}