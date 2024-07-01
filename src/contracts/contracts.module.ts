import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './entities/contracts.entity';
import { ContractAction } from './entities/contract_actions.entity';
import { ContractsService } from './contracts.service';
import { ContractActionsService } from './contract_actions.service';
import { ContractsController } from './contracts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Contract, ContractAction])],
  controllers: [ContractsController],
  providers: [ContractsService, ContractActionsService],
  exports: [ContractsService, ContractActionsService],
})
export class ContractsModule {}