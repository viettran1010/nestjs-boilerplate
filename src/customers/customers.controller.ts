import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get('/confirmation')
  @UseGuards(AuthGuard('jwt'))
  async getCustomerConfirmation(@Query('user_id') user_id: number) {
    return await this.customersService.getCustomerDetails(user_id);
  }
}