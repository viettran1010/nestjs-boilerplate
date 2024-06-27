import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // Check if the user ID exists in the session, indicating an authenticated user
    const isAuthenticated = request.session?.userId;
    return Boolean(isAuthenticated);
  }
}