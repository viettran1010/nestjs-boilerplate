import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // Corrected import
import { Serialize } from 'class-transformer'; // Corrected import
import { CustomersService } from './customers.service';
import { CustomerDetailsDto } from './dto/customer-details.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get('/confirmation')
  @Serialize(CustomerDetailsDto) // Corrected decorator
  @UseGuards(AuthGuard('jwt'))
  async getCustomerConfirmation(@Query('user_id') user_id: number) {
    return await this.customersService.getCustomerDetails(user_id);
  }
}