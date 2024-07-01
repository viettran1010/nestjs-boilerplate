import { Injectable } from '@nestjs/common';
import { AddressUpdate } from './address_update.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AddressUpdateService {
  constructor(
    @InjectRepository(AddressUpdate)
    private addressUpdateRepository: Repository<AddressUpdate>,
  ) {}

  // Add methods for address update logic here
}