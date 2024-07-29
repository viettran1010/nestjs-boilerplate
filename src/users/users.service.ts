import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AddressUpdate } from '../address_updates/address_update.entity';
import { AuditLog } from '../audit_logs/audit_log.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(AddressUpdate)
    private addressUpdateRepository: Repository<AddressUpdate>,
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,
  ) {}

  async recordAddressUpdate(user_id: number, address_update_file: string, date_to_start_converting: Date, date_of_end_converting: Date): Promise<string> {
    // Validate dates
    if (date_to_start_converting >= date_of_end_converting) {
      throw new Error('Start date must be before end date.');
    }

    // Create a new AddressUpdate entry
    const addressUpdate = this.addressUpdateRepository.create({
      user_id,
      address_update_file,
      date_to_start_converting,
      date_of_end_converting,
      status: 'pending', // Assuming 'pending' is a valid status
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Save the AddressUpdate entry to the database
    await this.addressUpdateRepository.save(addressUpdate);

    // Create a new AuditLog entry
    const auditLog = this.auditLogRepository.create({
      action: 'create_address_update',
      timestamp: new Date(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Save the AuditLog entry to the database
    await this.auditLogRepository.save(auditLog);

    // Return success message
    return 'Address update request recorded successfully.';
  }

  async create(email: string, password: string) {
    // to make sure user is valid before saving
    // also hooks are called
    const user = this.usersRepository.create({ email, password });
    return await this.usersRepository.save(user);
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    return await this.usersRepository.findOneBy({ id });
  }

  async find(email: string) {
    console.log('email: ', email);
    return await this.usersRepository.findBy({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return await this.usersRepository.remove(user);
  }
}