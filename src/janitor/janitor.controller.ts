dwadawimport {
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
    if (!createJanitorDto.name) {
      throw new Error('Name is required');
    }
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

  @Get('/search/:name')
  searchByName(@Param('name') name: string) {
    return this.janitorService.searchByName(name);
  }
}
