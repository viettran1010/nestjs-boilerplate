import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  // ... other methods ...

  @Post('/validate')
  async validateCustomerRegistration(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      const validationResponse = await this.customersService.validateCustomer(createCustomerDto);
      return validationResponse;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}