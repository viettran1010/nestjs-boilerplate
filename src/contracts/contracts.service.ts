import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract } from './contract.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
  ) {}

  async findOne(id: number): Promise<Contract | undefined> {
    return this.contractRepository.findOne(id);
  }
}