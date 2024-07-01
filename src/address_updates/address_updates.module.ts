import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressUpdateService } from './address_update.service';
import { AddressUpdatesController } from './address_updates.controller';
import { AddressUpdate } from './address_update.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddressUpdate])],
  controllers: [AddressUpdatesController],
  providers: [AddressUpdateService],
})
export class AddressUpdatesModule {}