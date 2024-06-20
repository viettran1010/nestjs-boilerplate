import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { User } from '../users/user.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  async createStudent(user: User, enrollmentDate: Date, status: string) {
    const student = this.studentsRepository.create({
      user,
      enrollmentDate,
      status,
    });
    return await this.studentsRepository.save(student);
  }
}