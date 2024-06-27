import { Body, Controller, Post, HttpStatus, HttpCode } from '@nestjs/common';
import { LogErrorMessageDto } from './dto/log-error-message.dto';
import { ErrorMessagesService } from './error_messages.service';

@Controller('error-messages')
export class ErrorMessagesController {
  constructor(private readonly errorMessagesService: ErrorMessagesService) {}

  @Post('log')
  @HttpCode(HttpStatus.CREATED)
  async logError(@Body() LogErrorMessageDto: LogErrorMessageDto) {
    const result = await this.errorMessagesService.logErrorMessage(LogErrorMessageDto);
    return result;
  }
}