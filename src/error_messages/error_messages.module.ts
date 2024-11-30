import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorMessage } from './error_message.entity';
import { ErrorMessagesService } from './error_messages.service'; // This service handles the business logic for error messages
import { ErrorMessagesController } from './error_messages.controller'; // This controller defines the API endpoints for error messages

@Module({
  imports: [TypeOrmModule.forFeature([ErrorMessage])],
  controllers: [ErrorMessagesController],
  providers: [ErrorMessagesService],
})
export class ErrorMessagesModule {}