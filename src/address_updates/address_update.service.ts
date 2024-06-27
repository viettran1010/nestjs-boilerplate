import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressUpdate } from '../address_updates/address_update.entity';
import { AuditLog } from '../audit_logs/audit_log.entity';
import { Repository } from 'typeorm';
import { ValidateAddressUpdateDto } from './dto/validate-address-update.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AddressUpdateService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(AddressUpdate)
    private addressUpdateRepository: Repository<AddressUpdate>,
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
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

      // Create a new AddressUpdate entry
      const addressUpdate = this.addressUpdateRepository.create({
        user_id: userId,
        date_to_start_converting: startDate,
        date_of_end_converting: endDate,
        status: 'pending', // Assuming 'pending' is a valid status
      });

      // Save the AddressUpdate entry to the database
      await this.addressUpdateRepository.save(addressUpdate);

      // Create a new AuditLog entry
      const auditLog = this.auditLogRepository.create({
        action: 'create_address_update',
        timestamp: new Date(),
        user_id: userId,
        created_at: new Date(),
        updated_at: new Date(),
      });

      // Save the AuditLog entry to the database
      await this.auditLogRepository.save(auditLog);

      return 'Dates are valid and in the correct order.';
    } catch (error) {
      throw new Error(`Validation failed: ${error.message}`);
    }
  }
}