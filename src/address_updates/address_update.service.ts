import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressUpdate } from './address_update.entity';
import { User } from '../users/user.entity';

@Injectable()
export class AddressUpdateService {
  constructor(
    @InjectRepository(AddressUpdate)
    private addressUpdateRepository: Repository<AddressUpdate>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateAddressUpdateDates(userId: number, dateToStartConverting: Date, dateOfEndConverting: Date): Promise<{ status: number; message: string }> {
    // Check if the user exists
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    // Validate date format (assuming date is passed as Date object, otherwise additional validation is needed)
    if (!(dateToStartConverting instanceof Date) || isNaN(dateToStartConverting.getTime())) {
      throw new BadRequestException('Invalid start date format.');
    }
    if (!(dateOfEndConverting instanceof Date) || isNaN(dateOfEndConverting.getTime())) {
      throw new BadRequestException('Invalid end date format.');
    }

    // Check if start date is before end date
    if (dateToStartConverting >= dateOfEndConverting) {
      throw new BadRequestException('Start date must be before end date.');
    }

    // If all validations pass, return success message
    return {
      status: 200,
      message: 'Address update dates have been set successfully.',
    };
  }
}