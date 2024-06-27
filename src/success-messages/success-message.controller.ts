import { Controller, Patch, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
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

  // Other endpoints...
}
