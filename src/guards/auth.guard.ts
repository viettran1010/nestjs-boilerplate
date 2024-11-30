import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // Check if the userId is present in the request session
    if (request.session?.userId) {
      return true;
    } else {
      return false;
    }
  }
}