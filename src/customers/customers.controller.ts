import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { CustomersService } from '../customers/customers.service';
import { CreateCustomerDto } from './dtos/create-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      const customer = await this.customersService.registerCustomer(createCustomerDto);
      return {
        message: 'Customer registered successfully',
        customerId: customer.id,
      };
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}