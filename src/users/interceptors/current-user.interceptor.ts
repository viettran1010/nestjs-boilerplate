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
    const authorizationHeader = request.headers.authorization;

    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      const decoded = this.jwtService.verify(token);

      if (decoded) {
        const user = await this.userService.findOne(decoded.id);
        request.currentUser = user;
      }
    }

    return next.handle();
  }
}