import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressUpdate } from './address_update.entity';
import { AuditLogService } from '../audit_logs/audit_log.service';

@Injectable()
export class AddressUpdateService {
  constructor(
    @InjectRepository(AddressUpdate)
    private addressUpdateRepository: Repository<AddressUpdate>,
    private auditLogService: AuditLogService,
  ) {}

  async cancelAddressUpdate(userId: number, addressUpdateId: number): Promise<string> {
    const addressUpdate = await this.addressUpdateRepository.findOne({
      where: { id: addressUpdateId, user: { id: userId } },
      relations: ['user'],
    });

    if (!addressUpdate) {
      throw new NotFoundException(`Address update with ID ${addressUpdateId} not found or does not belong to user with ID ${userId}`);
    }

    if (addressUpdate.status === 'completed' || addressUpdate.status === 'cancelled') {
      throw a BadRequestException(`Address update with ID ${addressUpdateId} is already in a final state and cannot be cancelled`);
    }

    addressUpdate.status = 'cancelled';
    await this.addressUpdateRepository.save(addressUpdate);

    await this.auditLogService.createAuditLog({
      'address_update_cancellation', userId,
      // Other necessary fields for the audit log
    });

    return 'Address update process has been successfully cancelled';
  }

  // Other methods of the service...
}