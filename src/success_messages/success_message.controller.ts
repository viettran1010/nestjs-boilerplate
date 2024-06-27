import { Controller, Patch, Param, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { SuccessMessageService } from './success_message.service';

@Controller('success-messages')
export class SuccessMessageController {
  constructor(private readonly successMessageService: SuccessMessageService) {}

  @Patch(':id/dismiss')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async dismissSuccessMessage(@Param('id') id: number): Promise<{ status: number; message: string }> {
    await this.successMessageService.dismissSuccessMessage(id);
    return {
      status: HttpStatus.OK,
      message: 'Success message modal has been dismissed.',
    };
  }

  // Other controller methods...
}