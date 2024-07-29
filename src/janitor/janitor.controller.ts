import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards } from '@nestjs/common';
import { JanitorService } from './janitor.service';
import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';
import { QueryFailedExceptionFilter } from '../../common/filters/query-failed-exception.filter';
import { CreateJanitorDto } from './dto/create-janitor.dto';
import { UpdateJanitorDto } from './dto/update-janitor.dto';
import { JanitorDto } from '../dto/janitor.dto'; // Assuming JanitorDto is correctly imported

@Controller('janitor')
@UseFilters(HttpExceptionFilter, QueryFailedExceptionFilter)
@Serialize(JanitorDto) // Assuming there is a JanitorDto that you want to serialize the response to
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
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateJanitorDto: UpdateJanitorDto) {
    return this.janitorService.update(+id, updateJanitorDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.janitorService.remove(+id);
  }
}