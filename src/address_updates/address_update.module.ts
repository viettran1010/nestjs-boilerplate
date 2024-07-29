import { Module } from '@nestjs/common';
import { AddressUpdateService } from './address_update.service';
import { AddressUpdateController } from './address_update.controller';

@Module({
  controllers: [AddressUpdateController],
  providers: [AddressUpdateService],
  exports: [AddressUpdateService],
})
export class AddressUpdateModule {}