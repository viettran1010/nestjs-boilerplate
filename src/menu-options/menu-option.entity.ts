import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserPermission } from 'src/user-permissions/user-permission.entity';

@Entity('menu_options')
export class MenuOption {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => UserPermission, userPermission => userPermission.menuOption)
  @Column({ type: 'varchar', length: 255 })
  label: string;

  @Column({ type: 'varchar', length: 255 })
  icon: string;

  @Column({ type: 'boolean' })
  requires_permission: boolean;

  user_permissions: UserPermission[];
}