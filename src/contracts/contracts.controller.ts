import { Body, Controller, Get, Param, Patch, Post, Query, Session, UseGuards, UseInterceptors, UseFilters } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { UpdateContractDto } from './dtos/update-contract.dto';
import { Contract } from './contract.entity';
import { I18nService } from '@nestjs-modules/i18n';

@Controller('contracts')
export class ContractsController {
  constructor(
    private readonly contractsService: ContractsService,
    private readonly i18n: I18nService
  ) {}

  // Other methods...

  @Patch(':id')
  async updateContract(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    const contract = await this.contractsService.update(parseInt(id), updateContractDto);
    const message = await this.i18n.translate('contracts.UPDATE_SUCCESS', { lang: 'en' }); // Assuming 'en' is the desired language
    return { contract, message };
  }
}