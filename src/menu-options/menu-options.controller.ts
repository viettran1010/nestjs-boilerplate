import { Controller, Get, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { MenuOptionsService } from './menu-options.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('menu-options')
export class MenuOptionsController {
  constructor(private readonly menuOptionsService: MenuOptionsService) {}

  @Get(':userId')
  @UseGuards(AuthGuard)
  async getMenuOptions(@Param('userId', ParseIntPipe) userId: number) {
    return await this.menuOptionsService.getAccessibleMenuOptions(userId);
  }
}