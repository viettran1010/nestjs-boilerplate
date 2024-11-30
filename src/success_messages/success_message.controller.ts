import { Controller, Patch, Param, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CreateSuccessMessageDto } from './dtos/create-success-message.dto';
import { SuccessMessageService } from './success_message.service';

@Controller('success-messages')
export class SuccessMessageController {
  constructor(private readonly successMessageService: SuccessMessageService) {}

  @Patch(':id/dismiss')
  @UseGuards(AuthGuard)
  async dismissSuccessMessage(@Param('id') id: number) {
    return await this.successMessageService.dismissSuccessMessage(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  async recordSuccessMessageDisplay(@Body() createSuccessMessageDto: CreateSuccessMessageDto) {
    return await this.successMessageService.recordSuccessMessage(
      createSuccessMessageDto.userId,
      createSuccessMessageDto.message,
      createSuccessMessageDto.detail,
    );
  }

  // Other controller methods...
}