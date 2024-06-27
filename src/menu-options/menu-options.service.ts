import { Injectable } from '@nestjs/common';
import { InjectRepository, Repository } from '@nestjs/typeorm';
import { MenuOption } from './menu-option.entity';
import { UserPermission } from '../user-permissions/user-permission.entity';

@Injectable()
export class MenuOptionsService {
  constructor(
    @InjectRepository(MenuOption)
    private readonly menuOptionsRepository: Repository<MenuOption>,
    @InjectRepository(UserPermission)
    private readonly userPermissionsRepository: Repository<UserPermission>,
  ) {}

  async getAccessibleMenuOptions(userId: number): Promise<{ label: string; icon: string; }[]> {
    try {
      const accessibleMenuOptions = await this.userPermissionsRepository
        .createQueryBuilder('user_permission')
        .innerJoinAndSelect(
          'user_permission.menuOption',
          'menu_option',
          'user_permission.user_id = :userId AND user_permission.has_access = TRUE',
          { userId }
        )
        .select(['menu_option.label', 'menu_option.icon'])
        .getMany();

      return accessibleMenuOptions.map(permission => ({
        label: permission.menuOption.label,
        icon: permission.menuOption.icon,
      }));
    } catch (error) {
      // Handle errors as appropriate for your application
      throw error;
    }
  }
}