import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { CreateStudentDto } from './dtos/create-student.dto';
import { StudentsService } from './students.service';
import { Student } from './student.entity';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('/signup')
  async signup(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      const student = await this.studentsService.signup(createStudentDto.email, createStudentDto.password);
      
      // TODO: Send a confirmation email to the student with the confirmation_token
      // Example: await this.emailService.sendConfirmationEmail(student.email, student.confirmation_token);

      return student;
    } catch (error) {
      if (error.status === 400) {
        throw new BadRequestException(error.response);
      }
      // Handle other types of exceptions here if necessary
      throw error;
    }
  }
}