import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // request.session is set by the @Session() decorator by cookieSession, whenever user signup or signin
    const userId = request.session?.userId;
    if (!userId) {
      return false;
    }
    const user = await this.userRepository.findOneBy({ id: userId });
    request.user = user;
    return Boolean(user);
  }
}