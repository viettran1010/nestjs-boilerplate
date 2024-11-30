import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedAccessException } from '../users/exceptions/unauthorized-access.exception';
import { Repository } from 'typeorm';
import { UserPermission } from '../user-permissions/user-permission.entity';
import { User } from '../users/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserPermission) private readonly userPermissionsRepository: Repository<UserPermission>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.session?.userId;
    if (!userId) {
      return false;
    }
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new UnauthorizedAccessException();
    }

    const userPermissions = await this.userPermissionsRepository.find({
      where: { user: user },
    });
    const hasAccess = userPermissions.some(permission => permission.has_access);
    if (!hasAccess) {
      throw new UnauthorizedAccessException();
    }

    request.user = user;
    return Boolean(user);
  }
}