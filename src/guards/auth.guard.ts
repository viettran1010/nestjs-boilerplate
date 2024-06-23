import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../users/auth.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const grantType = this.reflector.get<string>('grant_type', context.getHandler());

    if (grantType === 'refresh_token') {
      const refreshToken = request.body.refresh_token;
      if (!refreshToken) {
        throw new UnauthorizedException('No refresh token provided');
      }
      // Call AuthService to handle the refresh token logic
      return this.authService.refreshToken(refreshToken);
    }

    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('You are not logged in');
    }
    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}