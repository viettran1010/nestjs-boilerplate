import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UnauthorizedAccessException } from './exceptions/unauthorized-access.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MenuOption } from '../menu-options/menu-option.entity';
import { UserPermission } from '../user-permissions/user-permission.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(MenuOption)
    private menuOptionsRepository: Repository<MenuOption>,
    @InjectRepository(UserPermission)
    private userPermissionsRepository: Repository<UserPermission>,
  ) {}

  async create(email: string, password: string) {
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

  async getMenuOptions(userId: number) {
    const accessibleMenuOptions = await this.menuOptionsRepository
      .createQueryBuilder('menu_option')
      .leftJoinAndSelect('menu_option.user_permissions', 'user_permission')
      .where('user_permission.user_id = :userId', { userId })
      .andWhere('user_permission.has_access = :hasAccess', { hasAccess: true })
      .select(['menu_option.label', 'menu_option.icon'])
      .getMany();

    return accessibleMenuOptions.map(option => ({
      label: option.label,
      icon: option.icon,
    }));
  }

  async validateUserAccess(userId: number, menuOptionId: number): Promise<boolean> {
    const permission = await this.userPermissionsRepository.findOne({
      where: {
        user_id: userId,
        menu_option_id: menuOptionId,
        has_access: true,
      },
    });

    if (!permission) {
      throw new UnauthorizedAccessException();
    }

    return true;
  }
}