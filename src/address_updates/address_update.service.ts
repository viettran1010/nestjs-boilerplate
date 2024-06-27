import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class AddressUpdateService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateAddressUpdateDates(userId: number, dateToStartConverting: string, dateOfEndConverting: string): Promise<string> {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found.`);
      }

      const dateFormatRegex = /^\d{4}\/\d{2}\/\d{2}$/;
      if (!dateFormatRegex.test(dateToStartConverting) || !dateFormatRegex.test(dateOfEndConverting)) {
        throw new Error('Invalid date format. Please use yyyy/mm/dd format.');
      }

      const startDate = new Date(dateToStartConverting);
      const endDate = new Date(dateOfEndConverting);
      if (startDate >= endDate) {
        throw new Error('The start date must be before the end date.');
      }

      return 'Dates are valid and in the correct order.';
    } catch (error) {
      throw new Error(`Validation failed: ${error.message}`);
    }
  }
}