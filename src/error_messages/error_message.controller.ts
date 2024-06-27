import { Controller, Patch, Body } from '@nestjs/common';
import { ErrorMessageService } from './error_message.service';
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

  // ... other controller methods
}