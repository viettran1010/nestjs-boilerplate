import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // request.session is set by the @Session() decorator by cookieSession, whenever user signup or signin
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verifyAsync(token);
      return Boolean(decoded);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}