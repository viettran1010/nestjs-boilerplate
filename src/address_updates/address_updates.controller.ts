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
    return await this.addressUpdateService.cancelAddressUpdate(userId, addressUpdateId);
  }

  // Other route handlers...
}