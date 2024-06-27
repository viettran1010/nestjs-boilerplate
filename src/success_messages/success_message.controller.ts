import { Controller, Patch, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { SuccessMessageService } from './success_message.service';

@Controller('success-messages')
export class SuccessMessageController {
  constructor(private readonly successMessageService: SuccessMessageService) {}

  @Patch(':id/dismiss')
  @UseGuards(AuthGuard)
  async dismissSuccessMessage(@Param('id') id: number) {
    return await this.successMessageService.dismissSuccessMessage(id);
  }

  // Other controller methods...
}