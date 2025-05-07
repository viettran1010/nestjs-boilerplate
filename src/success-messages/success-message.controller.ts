import { Controller, Patch, Param, UseGuards, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SuccessMessageDisplayDto } from '../users/dtos/success-message-display.dto';
import { SuccessMessageService } from './success-message.service';

@Controller('success-messages')
export class SuccessMessageController {
  constructor(private readonly successMessageService: SuccessMessageService) {}

  @Patch(':id/dismiss')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async dismissSuccessMessage(@Param('id') id: number) {
    await this.successMessageService.dismissSuccessMessage(id);
    return { message: 'Success message dismissed successfully.' };
  }

  @Post('/display')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async recordSuccessMessageDisplay(@Body() body: SuccessMessageDisplayDto) {
    await this.successMessageService.recordSuccessMessageDisplay(body.user_id, body.message, body.detail);
    return {
      status: HttpStatus.CREATED,
      message: 'Success message display has been recorded.'
    };
  }

  // Other endpoints...
}