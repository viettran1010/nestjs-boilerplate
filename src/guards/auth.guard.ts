import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../reports/report.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Report)
    private reportRepository: Repository<Report>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization ? request.headers.authorization.split(' ')[1] : null;
    return token ? this.validateToken(token) : this.validateConfirmationToken(request.body.confirmation_token);
  }

  private async validateToken(token: string): Promise<boolean> {
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return Boolean(decoded);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private async validateConfirmationToken(confirmation_token: string): Promise<boolean> {
    if (!confirmation_token) {
      throw new UnauthorizedException('No confirmation token provided');
    }
    const report = await this.reportRepository.findOne({
      where: { confirmation_token, confirmed_at: null }
    });
    if (!report) {
      throw new UnauthorizedException('Invalid or expired confirmation token');
    }
    return true;
  }
}