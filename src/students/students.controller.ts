import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { CreateStudentDto } from './dtos/create-student.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { StudentsService } from './students.service';
import { Student } from './student.entity';

@Controller('students')
export class StudentsController {
  constructor(
    private readonly mailerService: MailerService,
    private readonly studentsService: StudentsService
  ) {}

  @Post('/signup')
  async signup(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      const student = await this.studentsService.signup(createStudentDto.email, createStudentDto.password);
      
      // Send a confirmation email to the student with the confirmation_token
      await this.mailerService.sendMail({
        to: student.email,
        subject: 'Please confirm your email',
        template: './confirmation', // The name of the template file in the /src/mail/templates folder
        context: { // Data to be sent to template engine
          email: student.email,
          url: `http://yourapp.com/confirm?confirmation_token=${student.confirmation_token}`,
          token: student.confirmation_token,
          link: 'Click here to confirm your email',
        },
      });

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