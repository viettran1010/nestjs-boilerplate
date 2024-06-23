import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        if (decoded) {
          const user = await this.userService.findOne(decoded.id);
          request.currentUser = user;
        }
      } catch (error) {
        // If there's an error, we simply don't attach the user to the request
        // This could be an expired token or a token signed with an incorrect secret
      }
    }

    return next.handle();
  }
}