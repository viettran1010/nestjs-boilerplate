import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressUpdateService } from './address_update.service';
import { AddressUpdateController } from './address_update.controller';
import { AddressUpdate } from './address_update.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddressUpdate])],
  controllers: [AddressUpdateController],
  providers: [AddressUpdateService],
})
export class AddressUpdateModule {}