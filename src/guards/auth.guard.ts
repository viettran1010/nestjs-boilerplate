import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // Check if the session has a userId and return true if present, otherwise false
    return request.session && request.session.userId ? true : false;
  }
}