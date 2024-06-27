import { UseFilters } from '@nestjs/common';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JanitorService } from './janitor.service';
import { CustomExceptionFilter } from '../common/filters/custom-exception.filter';
import { CreateJanitorDto } from './dto/create-janitor.dto';
import { UpdateJanitorDto } from './dto/update-janitor.dto';

@Controller('janitor')
@UseFilters(CustomExceptionFilter)
export class JanitorController {
  constructor(private readonly janitorService: JanitorService) {}

  @Post()
  create(@Body() createJanitorDto: CreateJanitorDto) {
    return this.janitorService.create(createJanitorDto);
  }

  @Get()
  findAll() {
    return this.janitorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.janitorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJanitorDto: UpdateJanitorDto) {
    return this.janitorService.update(+id, updateJanitorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.janitorService.remove(+id);
  }
}