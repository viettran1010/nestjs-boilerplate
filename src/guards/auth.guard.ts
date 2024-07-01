import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // Check for the existence of 'userId' in the session object of the request
    if (request.session && request.session.userId) {
      return true;
    } else {
      return false;
    }
  }
}