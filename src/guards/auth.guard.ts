import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization ? request.headers.authorization.split(' ')[1] : null;
    return this.validateToken(token);
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
}