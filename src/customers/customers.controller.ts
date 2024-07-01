import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}
  
  @Get('/confirmation/:user_id')
  @UseGuards(AuthGuard)
  async getCustomerConfirmation(@Param('user_id') userId: number) {
    const customerDetails = await this.customersService.getCustomerDetails(userId);
    // Mark the customer details as non-editable for the frontend
    return { ...customerDetails, editable: false };
  }
}