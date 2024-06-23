import { Injectable, UnauthorizedException, ExecutionContext, CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Not authorized');
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token format');
    }

    try {
      const decoded = this.jwtService.verify(token);
      // Check if the token is blacklisted
      // TODO: Implement the actual check using a service or cache
      const isBlacklisted = false; // Replace with actual check
      if (isBlacklisted) {
        throw new UnauthorizedException('Token is blacklisted');
      }
      return Boolean(decoded);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}