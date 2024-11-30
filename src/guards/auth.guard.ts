import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    try {
      const jwt = request.headers.authorization?.startsWith('Bearer ') ? request.headers.authorization.split(' ')[1] : null;
      if (!jwt) {
        throw new UnauthorizedException();
      }
      const decoded = this.jwtService.verify(jwt);
      request.user = decoded;
      return true;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}