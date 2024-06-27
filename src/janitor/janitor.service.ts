import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJanitorDto } from './dto/create-janitor.dto';
import { UpdateJanitorDto } from './dto/update-janitor.dto';
import { Janitor } from './entities/janitor.entity';

@Injectable()
export class JanitorService {
  constructor(
    @InjectRepository(Janitor)
    private janitorRepository: Repository<Janitor>,
  ) {}

  async create(createJanitorDto: CreateJanitorDto) {
    const janitor = this.janitorRepository.create(createJanitorDto);
    return this.janitorRepository.save(janitor);
  }

  async findAll() {
    return this.janitorRepository.find();
  }

  async findOne(id: number) {
    const janitor = await this.janitorRepository.findOneBy({ id });
    if (!janitor) {
      throw new NotFoundException(`Janitor with ID ${id} not found`);
    }
    return janitor;
  }

  async update(id: number, updateJanitorDto: UpdateJanitorDto) {
    const janitor = await this.janitorRepository.preload({
      id: id,
      ...updateJanitorDto,
    });
    if (!janitor) {
      throw new NotFoundException(`Janitor with ID ${id} not found`);
    }
    return this.janitorRepository.save(janitor);
  }

  async remove(id: number) {
    const janitor = await this.findOne(id);
    if (!janitor) {
      throw new NotFoundException(`Janitor with ID ${id} not found`);
    }
    return this.janitorRepository.remove(janitor);
  }
}