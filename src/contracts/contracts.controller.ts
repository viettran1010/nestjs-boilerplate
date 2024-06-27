import { Controller, Patch, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  // ... other route handlers

  @Patch('/:id/approve')
  @UseGuards(AuthGuard, AdminGuard)
  async approveContract(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    const updatedContract = await this.contractsService.approveContract(id, user.id);
    return {
      message: 'Contract approved successfully',
      contract: updatedContract,
    };
  }
}