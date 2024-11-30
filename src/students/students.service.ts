import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { User } from '../users/user.entity';
import { CreateStudentDto } from './dtos/create-student.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateAndCreateStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const { email, password, enrollmentDate, status } = createStudentDto;

    let user = await this.usersRepository.findOneBy({ email });

    if (user) {
      throw new HttpException('A student with this email already exists.', HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user = this.usersRepository.create({
      email,
      password: hashedPassword,
      admin: false,
    });

    await this.usersRepository.save(user);

    const student = this.studentsRepository.create({
      user,
      enrollmentDate,
      status,
    });

    return await this.studentsRepository.save(student);
  }

  async createStudent(user: User, enrollmentDate: Date, status: string) {
    const student = this.studentsRepository.create({
      user,
      enrollmentDate,
      status,
    });
    return await this.studentsRepository.save(student);
  }
}