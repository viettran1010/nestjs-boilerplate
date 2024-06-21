import { Body, Controller, Post, UseGuards, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { StudentsService } from './students.service';
import { JwtService } from '@nestjs/jwt';

@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly jwtService: JwtService
  ) {}

  @Post('login')
  @UseGuards(AuthGuard)
  async login(@Body('email') email: string, @Body('password') password: string) {
    try {
      const student = await this.studentsService.validateStudentLogin(email, password);
      const payload = { sub: student.id };
      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '24h'
      });
      const refreshToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '24h'
      });

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
        resource_owner: 'students',
        resource_id: student.id,
        expires_in: 86400,
        token_type: 'Bearer',
        scope: 'student',
        created_at: new Date().toISOString(),
        refresh_token_expires_in: 86400,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('An unexpected error occurred');
    }
  }
}