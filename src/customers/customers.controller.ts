import { Controller, Get, UseGuards, Session } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}
  
  @Get('/confirm')
  @UseGuards(AuthGuard)
  async getCustomerConfirmation(@Session() session: any) {
    const userId = session.user_id;
    const customerDetails = await this customersService.getCustomerDetails(userId);
    // Mark the customer details as non-editable for the frontend
    return { ...customerDetails, editable: false };
  }
}