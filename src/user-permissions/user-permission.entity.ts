import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { MenuOption } from '../menu-options/menu-option.entity';

@Entity()
export class UserPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  has_access: boolean;

  @Column()
  user_id: number;

  @Column()
  menu_option_id: number;

  @ManyToOne(() => User, (user) => user.userPermissions)
  user: User;

  @ManyToOne(() => MenuOption, (menuOption) => menuOption.userPermissions)
  menuOption: MenuOption;
}