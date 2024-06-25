import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turtle } from './turtle.entity';
import { Location } from '../locations/location.entity';

@Injectable()
export class TurtlesService {
  constructor(
    @InjectRepository(Turtle)
    private turtlesRepository: Repository<Turtle>,
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
  ) {}

  async createTurtle(createTurtleDto: { species: string; age: number; health_status: string; location_id: number }) {
    const { location_id } = createTurtleDto;
    const location = await this.locationsRepository.findOneBy({ id: location_id });
    if (!location) {
      throw new NotFoundException(`Location with ID ${location_id} not found.`);
    }

    const turtle = this.turtlesRepository.create(createTurtleDto);
    await this.turtlesRepository.save(turtle);
    return turtle;
  }
}