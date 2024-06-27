import { Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { InjectRepository, Repository } from '@nestjs/typeorm';
import { AddressUpdate } from './address_update.entity';
import { User } from '../users/user.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AddressUpdateService {
  constructor(
    @InjectRepository(AddressUpdate)
    private addressUpdateRepository: Repository<AddressUpdate>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async attachAddressUpdateFile(user_id: number, file_buffer: Buffer, original_name: string): Promise<AddressUpdate> {
    // Check if the file has a .csv extension
    if (!original_name.match(/\.csv$/)) {
      throw new UnsupportedMediaTypeException('Only .csv files are supported');
    }

    // Generate a unique identifier for the file
    const uniqueIdentifier = Date.now().toString();

    // Save the file in a designated storage location
    const storageDir = path.join(__dirname, '..', 'storage', 'address_updates');
    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir, { recursive: true });
    }
    const filename = `${uniqueIdentifier}-${original_name}`;
    const filePath = path.join(storageDir, filename);
    fs.writeFileSync(filePath, file_buffer);

    // Create a new entry in the "address_updates" table
    const user = await this.userRepository.findOneBy({ id: user_id });
    if (!user) {
      throw new Error('User not found');
    }
    const addressUpdate = this.addressUpdateRepository.create({
      user,
      file_attachment: filePath,
      status: 'pending',
    });

    // Save the new entry to the database
    await this.addressUpdateRepository.save(addressUpdate);

    // Return the new entry
    return addressUpdate;
  }
}