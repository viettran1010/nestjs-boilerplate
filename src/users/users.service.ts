import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UnauthorizedAccessException } from '../exceptions/unauthorized-access.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserPermission } from '../user_permissions/user_permission.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserPermission) private userPermissionRepository: Repository<UserPermission>,
  ) {}

  async create(email: string, password: string) {
    // to make sure user is valid before saving
    // also hooks are called
    const user = this.usersRepository.create({ email, password });
    return await this.usersRepository.save(user);
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    return await this.usersRepository.findOneBy({ id });
  }

  async find(email: string) {
    console.log('email: ', email);
    return await this.usersRepository.findBy({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return await this.usersRepository.remove(user);
  }

  async checkUserPermission(userId: number, menuOptionId: number): Promise<boolean> {
    const permission = await this.userPermissionRepository.findOne({
      where: {
        user_id: userId,
        menu_option_id: menuOptionId,
      },
    });

    if (!permission || !permission.has_access) {
      throw new UnauthorizedAccessException('Unauthorized access to menu option');
    }

    return true;
  }
}