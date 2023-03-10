import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // request.session is set by the @Session() decorator by cookieSession, whenever user signup or signin
    return request.session?.userId;
  }
}
