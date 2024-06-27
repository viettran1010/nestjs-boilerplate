import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Serialize } from 'class-transformer';
import { CustomersService } from './customers.service';
import { CustomerDetailsDto } from './dto/customer-details.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get('/confirmation')
  @Serialize(CustomerDetailsDto)
  @UseGuards(AuthGuard('jwt'))
  async getCustomerConfirmation(@Query('user_id') user_id: number) {
    return await this.customersService.getCustomerDetails(user_id);
  }
}