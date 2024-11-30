import {
  IsEmail,
  IsOptional,
  IsNumber,
  IsBoolean,
  Min,
  IsDateString,
  IsEnum,
} from 'class-validator';

enum StudentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  GRADUATED = 'graduated',
}

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  age?: number;

  @IsBoolean()
  @IsOptional()
  admin?: boolean;

  @IsNumber()
  userId: number;

  @IsDateString()
  enrollmentDate: Date;

  @IsEnum(StudentStatus)
  status: StudentStatus;
}