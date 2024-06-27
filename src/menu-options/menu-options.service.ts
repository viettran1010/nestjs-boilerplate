import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuOption } from './menu-option.entity';
import { UserPermission } from '../user-permissions/user-permission.entity';

@Injectable()
export class MenuOptionsService {
  constructor(
    @InjectRepository(MenuOption)
    private menuOptionsRepository: Repository<MenuOption>,
    @InjectRepository(UserPermission)
    private userPermissionsRepository: Repository<UserPermission>,
  ) {}

  async getAccessibleMenuOptions(userId: number): Promise<{ label: string; icon: string; }[]> {
    try {
      const accessibleMenuOptions = await this.menuOptionsRepository
        .createQueryBuilder('menu_option')
        .innerJoinAndSelect(
          'menu_option.user_permissions',
          'user_permission',
          'user_permission.user_id = :userId AND user_permission.has_access = :hasAccess',
          { userId, hasAccess: true }
        )
        .select(['menu_option.label', 'menu_option.icon'])
        .getMany();

      return accessibleMenuOptions.map(option => ({
        label: option.label,
        icon: option.icon,
      }));
    } catch (error) {
      // Handle errors as appropriate for your application
      throw error;
    }
  }
}