import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JanitorService } from './janitor.service';
import { CreateJanitorDto } from './dto/create-janitor.dto';
import { UpdateJanitorDto } from './dto/update-janitor.dto';

@Controller('janitor')
export class JanitorController {
  constructor(private readonly janitorService: JanitorService) {}

  @Post()
  create(@Body() createJanitorDto: CreateJanitorDto) {
    if (!createJanitorDto) {
      throw new Error('Create Janitor DTO is required');
    }
    return this.janitorService.create(createJanitorDto);
  }

  @Get()
  findAll() {
    return this.janitorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!id) {
      throw new Error('ID is required');
    }
    return this.janitorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJanitorDto: UpdateJanitorDto) {
    if (!id) {
      throw new Error('ID is required');
    }
    return this.janitorService.update(+id, updateJanitorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    if (!isNaN(Number(id))) {
      throw new Error('ID must be a number');
    }
    return this.janitorService.remove(+id);
  }

  @Get('/search/:name')
  searchByName(@Param('name') name: string) {
    if (!isNaN(Number(name))) {
      throw new Error('Name must be a string');
    }

    return this.janitorService.searchByName(name);
  }
}
