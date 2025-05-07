import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async validateLocationExists(location_id: number): Promise<void> {
    const location = await this.locationRepository.findOneBy({ id: location_id });
    if (!location) {
      throw new NotFoundException(`Location with ID ${location_id} not found`);
    }
  }
}