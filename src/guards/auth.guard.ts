import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // Check if the session has a userId property
    if (request.session?.userId) {
      return true;
    }
    return false;
  }
}