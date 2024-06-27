import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { MenuOption } from './menu-option.entity';
import { UserPermission } from '../user-permissions/user-permission.entity';

@Injectable()
export class MenuOptionsService {
  constructor(
    @InjectRepository(MenuOption) private menuOptionsRepository: Repository<MenuOption>,
    @InjectRepository(UserPermission) private userPermissionsRepository: Repository<UserPermission>,
  ) {}

  async getAccessibleMenuOptions(userId: number): Promise<{ label: string; icon: string; }[]> {
    try {
      const accessibleMenuOptions = await this.menuOptionsRepository
        .createQueryBuilder('menu_option') // Create a query builder for the menu_option entity
        .innerJoin(UserPermission, 'user_permission', 'user_permission.menu_option_id = menu_option.id') // Join with the user_permission entity
        .where('user_permission.user_id = :userId', { userId }) // Where the user_id matches the provided userId
        .andWhere('user_permission.has_access = :hasAccess', { hasAccess: true }) // And the has_access flag is true
        .select(['menu_option.label', 'menu_option.icon']) // Select only the label and icon fields
        .getMany(); // Execute the query and get the results

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