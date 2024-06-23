import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    try {
      return this.validateToken(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private async validateToken(token: string): Promise<boolean> {
    const decoded = await this.jwtService.verifyAsync(token);
    return Boolean(decoded);
  }

  private extractToken(request: any): string {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('No authentication token provided');
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedException('Invalid authentication token format');
    }
    return parts[1];
  }
}