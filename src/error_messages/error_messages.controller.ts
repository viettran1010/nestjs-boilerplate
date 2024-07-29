import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ErrorMessagesService } from './error_messages.service';

@Controller('error-messages')
export class ErrorMessagesController {
  constructor(private readonly errorMessagesService: ErrorMessagesService) {}

  @Post()
  async logError(@Body() body: any) {
    // You should create a DTO to type the body, but for simplicity, we're using any here
    const result = await this.errorMessagesService.logErrorMessage(
      body.user_id,
      body.error_icon,
      body.error_message,
      body.error_detail,
      body.timestamp,
      body.action_taken,
      body.contract_id,
    );
    return result;
  }

  @Get('/most-recent/:userId')
  async getMostRecentErrorMessage(@Param('userId') userId: number) {
    return await this.errorMessagesService.findMostRecentErrorMessage(userId);
  }
}