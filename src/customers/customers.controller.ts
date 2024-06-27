import {
  Body,
  Controller,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { AuthGuard } from '../guards/auth.guard';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Put('/:id')
  @UseGuards(AuthGuard)
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return await this.customersService.updateCustomer({
      id: parseInt(id),
      ...updateCustomerDto,
    });
  }
}