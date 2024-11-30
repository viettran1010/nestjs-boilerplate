import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AddressUpdate } from '../address_updates/address_update.entity';
import { AuditLog } from '../audit_logs/audit_log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, AddressUpdate, AuditLog])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}