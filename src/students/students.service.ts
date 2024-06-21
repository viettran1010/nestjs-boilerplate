import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan } from 'typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  async signup(email: string, password: string) {
    // Check if email is already taken
    const existingStudent = await this.studentsRepository.findOneBy({ email });
    if (existingStudent) {
      throw new BadRequestException('Email is already taken');
    }

    // Generate a confirmation token
    const confirmationToken = randomBytes(32).toString('hex');

    // Hash the password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashedPassword = `${salt}.${hash.toString('hex')}`;

    // Create a new student record
    const student = this.studentsRepository.create({
      email,
      encrypted_password: hashedPassword,
      confirmation_token: confirmationToken,
      confirmed_at: null,
    });

    // Save the new student record to the database
    await this.studentsRepository.save(student);

    // TODO: Send a confirmation email to the student

    return student;
  }

  async confirmEmail(confirmation_token: string): Promise<void> {
    const student = await this.studentsRepository.findOne({
      where: {
        confirmation_token,
        confirmed_at: LessThan(new Date()),
      },
    });

    if (!student) {
      throw new BadRequestException('Invalid or expired confirmation token');
    }

    student.confirmed_at = new Date();
    await this.studentsRepository.save(student);
  }

  // Additional methods and logic...
}