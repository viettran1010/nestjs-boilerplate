import { Body, Controller, Post, Param } from '@nestjs/common';
import { AddressUpdateService } from './address_update.service';

@Controller('address-updates')
export class AddressUpdatesController {
  constructor(private readonly addressUpdateService: AddressUpdateService) {}

  @Post('/:addressUpdateId/cancel')
  async cancelAddressUpdate(
    @Param('addressUpdateId') addressUpdateId: number,
    @Body('userId') userId: number
  ) {
    try {
      return await this.addressUpdateService.cancelAddressUpdate(userId, addressUpdateId);
    } catch (error) {
      // Handle the error based on the type of exception thrown
      // For example, if it's a NotFoundException or BadRequestException
      // return the appropriate HTTP status code and error message
      throw error;
    }
  }

  // Other route handlers...
}