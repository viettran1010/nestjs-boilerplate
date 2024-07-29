import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AddressUpdateService } from './address_update.service';
import { SetAddressUpdateDatesDto } from './dto/set-address-update-dates.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('api/address_updates')
export class AddressUpdatesController {
  constructor(private readonly addressUpdateService: AddressUpdateService) {}

  @Post()
  @UseGuards(AuthGuard)
  async setAddressUpdateDates(@Body() setAddressUpdateDatesDto: SetAddressUpdateDatesDto) {
    const { userId, dateToStartConverting, dateOfEndConverting } = setAddressUpdateDatesDto;
    const startDate = new Date(dateToStartConverting);
    const endDate = new Date(dateOfEndConverting);

    return await this.addressUpdateService.validateAddressUpdateDates(userId, startDate, endDate);
  }
}