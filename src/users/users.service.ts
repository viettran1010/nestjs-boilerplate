import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuditLog } from '../audit_logs/audit_log.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(AuditLog)
    private auditLogRepository: Repository<AuditLog>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async logEntryAction(action: string, timestamp: Date, contract_id: number, user_id: number) {
    try {
      const auditLog = this.auditLogRepository.create({
        action,
        timestamp,
        contract_id,
        user_id,
      });

      await this.auditLogRepository.save(auditLog);
      return { message: 'Log entry action successfully recorded.' };
    } catch (error) {
      throw new Error('Failed to log entry action.');
    }
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