import { Body, Controller, Post } from '@nestjs/common';
import { CreateTurtleDto } from './dto/create-turtle.dto';
import { TurtlesService } from './turtles.service';

@Controller('turtles')
export class TurtlesController {
  constructor(private readonly turtlesService: TurtlesService) {}

  @Post()
  async createTurtle(@Body() createTurtleDto: CreateTurtleDto) {
    return await this.turtlesService.createTurtle(createTurtleDto);
  }
}