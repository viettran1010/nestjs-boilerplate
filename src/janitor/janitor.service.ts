import { Injectable } from '@nestjs/common';
import { CreateJanitorDto } from './dto/create-janitor.dto';
import { UpdateJanitorDto } from './dto/update-janitor.dto';

@Injectable()
export class JanitorService {
  create(createJanitorDto: CreateJanitorDto) {
    return 'This action adds a new janitor';
  }

  findAll() {
    return `This action returns all janitor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} janitor`;
  }

  update(id: number, updateJanitorDto: UpdateJanitorDto) {
    return `This action updates a #${id} janitor`;
  }

  remove(id: number) {
    return `This action removes a #${id} janitor`;
  }
}
