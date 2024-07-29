import { IsEmail, IsEnum, IsString, IsDate } from 'class-validator';
import { StudentStatus } from '../student.entity';

export class CreateStudentDto {
  @IsEmail({}, { message: 'Email is required and must be in a valid format.' })
  email: string;

  @IsString({ message: 'Password is required and must meet complexity requirements.' })
  password: string;

  @IsDate({ message: 'Enrollment date is required and must be a valid date.' })
  enrollmentDate: Date;

  @IsEnum(StudentStatus, { message: 'Status is required and must be one of the allowed values.' })
  status: StudentStatus;
}