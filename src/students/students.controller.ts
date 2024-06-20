import { Controller, Post, Body } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dtos/create-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    const student = await this.studentsService.createStudent(
      createStudentDto.user,
      createStudentDto.enrollmentDate,
      createStudentDto.status
    );
    return student;
  }
}