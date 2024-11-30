import { Controller, Patch, Body, Post } from '@nestjs/common';
import { ErrorMessageService } from './error_message.service';
import { LogErrorMessageDto } from './dto/log-error-message.dto';
import { DismissErrorMessageDto } from './dto/dismiss-error-message.dto';

@Controller('error-messages')
export class ErrorMessageController {
  constructor(private readonly errorMessageService: ErrorMessageService) {}

  @Patch('/dismiss')
  async dismiss(@Body() dismissErrorMessageDto: DismissErrorMessageDto) {
    const { userId, errorMessageId } = dismissErrorMessageDto;
    const updatedErrorMessage = await this.errorMessageService.dismissErrorMessage(userId, errorMessageId);
    return {
      message: 'Error message dismissed successfully.',
      data: updatedErrorMessage,
    };
  }

  @Post('/log')
  async log(@Body() logErrorMessageDto: LogErrorMessageDto) {
    const { userId, errorIcon, errorMessage, errorDetail, timestamp, actionTaken } = logErrorMessageDto;
    const loggedErrorMessage = await this.errorMessageService.logErrorMessage(userId, errorIcon, errorMessage, errorDetail, timestamp, actionTaken);
    return {
      statusCode: 201,
      message: 'Error message logged successfully.',
      data: loggedErrorMessage,
    };
  }

  // ... other controller methods
}