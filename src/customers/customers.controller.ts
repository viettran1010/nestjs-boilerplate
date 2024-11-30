import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomersService } from './customers.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CustomerResponseDto } from './dto/customer.response.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('/register')
  @Serialize(CustomerResponseDto)
  async register(@Body() createCustomerDto: CreateCustomerDto) {
    try {
      const customer = await this.customersService.registerCustomer(createCustomerDto);
      return customer;
    } catch (error) {
      throw new HttpException(error.response || error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }
}