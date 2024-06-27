import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuccessMessageService } from './success_message.service';
import { SuccessMessageController } from './success_message.controller';
import { SuccessMessage } from './success_message.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SuccessMessage]),
    UsersModule,
  ],
  controllers: [SuccessMessageController],
  providers: [SuccessMessageService],
  exports: [SuccessMessageService],
})
export class SuccessMessagesModule {}