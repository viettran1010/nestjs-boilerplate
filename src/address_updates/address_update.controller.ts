import { Body, Controller, Post } from '@nestjs/common';
import { AddressUpdateService } from './address_update.service';
import { ValidateAddressUpdateDto } from './dto/validate-address-update.dto';

@Controller('address-updates')
export class AddressUpdateController {
  constructor(private readonly addressUpdateService: AddressUpdateService) {}

  @Post('/validate-dates')
  async validateAddressUpdateDates(@Body() validateAddressUpdateDto: ValidateAddressUpdateDto) {
    return await this.addressUpdateService.validateAddressUpdateDates(
      validateAddressUpdateDto.userId,
      validateAddressUpdateDto.dateToStartConverting,
      validateAddressUpdateDto.dateOfEndConverting,
    );
  }
}