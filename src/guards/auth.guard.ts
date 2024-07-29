import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtPayload } from '@nestjs/jwt';
import { Report } from '../reports/report.entity';
import { User } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService<JwtPayload>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Report) private readonly reportRepository: Repository<Report>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No authorization header provided');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = this.jwtService.verify(token);
      if (decodedToken && decodedToken.resource_owner === 'users') {
        const user = await this.userRepository.findOneBy({ id: decodedToken.sub });
        if (!user) {
          throw new UnauthorizedException('User not found');
        }
        request.user = user;
      } else if (decodedToken && decodedToken.resource_owner === 'reports') {
        const report = await this.reportRepository.findOneBy({ id: decodedToken.sub });
        if (!report) {
          throw new UnauthorizedException('Report not found or token invalid');
        }
        request.report = report;
      } else {
        throw new UnauthorizedException('Invalid token payload');
      }
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}