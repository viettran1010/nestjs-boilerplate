import { Body, Controller, Post, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async setAddressUpdateDates(@Body() validateAddressUpdateDto: ValidateAddressUpdateDto) {
    try {
      await this.addressUpdateService.validateAddressUpdateDates(
        validateAddressUpdateDto.userId,
        validateAddressUpdateDto.dateToStartConverting,
        validateAddressUpdateDto.dateOfEndConverting,
      );
      return {
        status: HttpStatus.OK,
        message: 'Address update dates have been set successfully.'
      };
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}