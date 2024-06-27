import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserPermission } from '../user-permissions/user-permission.entity';
import { MenuOption } from '../menu-options/menu-option.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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

  async getUserMenuOptions(userId: number): Promise<MenuOption[]> {
    const userPermissions = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userPermissions', 'userPermission')
      .leftJoinAndSelect('userPermission.menuOption', 'menuOption')
      .where('user.id = :userId', { userId })
      .andWhere('userPermission.has_access = :hasAccess', { hasAccess: true })
      .getOne();

    if (!userPermissions) {
      throw new NotFoundException('User permissions not found');
    }

    return userPermissions.userPermissions.map((permission) => permission.menuOption);
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