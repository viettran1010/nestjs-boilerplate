import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { MenuOption } from '../menu_options/menu_option.entity';

@Entity()
export class UserPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  has_access: boolean;

  @ManyToOne(() => User, user => user.userPermissions)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => MenuOption, menuOption => menuOption.userPermissions)
  @JoinColumn({ name: 'menu_option_id' })
  menu_option_id: number;
}