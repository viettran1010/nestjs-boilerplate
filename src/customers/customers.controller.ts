import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthGuard } from '../guards/auth.guard';
import { CustomersService } from './customers.service';
import { CustomerDto } from './dtos/customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get('/search')
  @UseGuards(AuthGuard)
  @Serialize(CustomerDto)
  async search(
    @Query('name') name?: string,
    @Query('katakana') katakana?: string,
    @Query('email_address') email_address?: string,
  ) {
    return await this.customersService.searchCustomer(name, katakana, email_address);
  }
}