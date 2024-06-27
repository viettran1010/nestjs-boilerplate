import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserPermission } from '../user_permissions/user_permission.entity';
import { MenuOption } from '../menu_options/menu_option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateUserPermission(userId: number, permissionLabel: string): Promise<boolean> {
    const userPermission = await this.usersRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect(UserPermission, 'userPermission', 'user.id = userPermission.user_id')
      .innerJoinAndSelect(MenuOption, 'menuOption', 'userPermission.menu_option_id = menuOption.id')
      .where('user.id = :userId', { userId })
      .andWhere('menuOption.label = :permissionLabel', { permissionLabel })
      .andWhere('userPermission.has_access = :hasAccess', { hasAccess: true })
      .getOne();

    return !!userPermission;
  }

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
}