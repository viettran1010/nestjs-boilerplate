import {
  Controller,
  Patch,
  Param,
  UseGuards,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  // Other controller methods...

  @Patch(':id/cancel-update')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async cancelCustomerUpdate(@Param('id') id: number) {
    const customer = await this.customersService.cancelUpdate(id);
    if (!customer) {
      throw new NotFoundException('Customer not found.');
    }
    return {
      status: HttpStatus.OK,
      message: 'Customer information update has been successfully canceled.',
    };
  }
}