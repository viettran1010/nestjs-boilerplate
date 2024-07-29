import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
  ) {}

  async validateStudentLogin(email: string, password: string): Promise<Student> {
    const student = await this.studentsRepository.findOne({
      where: { email },
    });

    if (!student) {
      throw new BadRequestException('Email or password is not valid');
    }

    const passwordValid = await bcrypt.compare(password, student.encrypted_password);
    if (!passwordValid) {
      await this.incrementFailedAttempts(student);
      throw new BadRequestException('Email or password is not valid');
    }

    if (student.failed_attempts >= 4) {
      await this.lockStudentAccount(student);
      throw new BadRequestException('User is locked');
    }

    if (student.confirmed_at === null) {
      throw new BadRequestException('User is not confirmed');
    }

    if (student.locked_at && new Date(student.locked_at).getTime() > new Date().getTime() - 2 * 60 * 60 * 1000) {
      throw new BadRequestException('User is locked');
    }

    await this.resetFailedAttempts(student);

    return student;
  }

  private async incrementFailedAttempts(student: Student): Promise<void> {
    student.failed_attempts += 1;
    await this.studentsRepository.save(student);
  }

  private async lockStudentAccount(student: Student): Promise<void> {
    student.locked_at = new Date();
    student.failed_attempts = 0;
    await this.studentsRepository.save(student);
  }

  private async resetFailedAttempts(student: Student): Promise<void> {
    student.failed_attempts = 0;
    await this.studentsRepository.save(student);
  }
}