import { Injectable, NotFoundException } from '@nestjs/common';
import { DuplicateRecordException } from '../exceptions/duplicate-record.exception';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // ... Other methods ...

  async updateStudentRecord(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const student = await this.usersRepository.findOneBy({ id });
    if (!student) {
      throw new NotFoundException('Student record not found.');
    }

    const duplicateByEmail = await this.usersRepository.findOneBy({ email: updateUserDto.email });
    if (duplicateByEmail && duplicateByEmail.id !== id) {
      throw new DuplicateRecordException('Duplicate student record found with the same email.');
    }

    const duplicateByUserId = await this.usersRepository.findOneBy({ id: updateUserDto.userId });
    if (duplicateByUserId && duplicateByUserId.id !== id) {
      throw new DuplicateRecordException('Duplicate student record found with the same user_id.');
    }

    Object.assign(student, updateUserDto);
    await this.usersRepository.save(student);

    return student;
  }

  // ... Other methods ...

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

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

  async update(id: number, attrs: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (attrs.email) {
      const userByEmail = await this.usersRepository.findOneBy({ email: attrs.email });
      if (userByEmail && userByEmail.id !== id) {
        throw new Error('DuplicateRecordException');
      }
    }
    if (attrs.hasOwnProperty('user_id')) {
      const userByUserId = await this.usersRepository.findOneBy({ id: attrs.user_id });
      if (userByUserId && userByUserId.id !== id) {
        throw new Error('DuplicateRecordException');
      }
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