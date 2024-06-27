import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorMessage } from './error_message.entity';
import { ErrorMessagesService } from './error_messages.service';
import { ErrorMessagesController } from './error_messages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ErrorMessage])],
  controllers: [ErrorMessagesController],
  providers: [ErrorMessagesService],
})
export class ErrorMessagesModule {}