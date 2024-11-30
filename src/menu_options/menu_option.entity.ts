import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserPermission } from '../user_permissions/user_permission.entity';

@Entity('menu_options')
export class MenuOption {
  @Column({ type: 'varchar' })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'varchar' })
  label: string;

  @Column({ type: 'varchar', nullable: true })
  icon: string | null;

  @Column({ type: 'boolean', default: false })
  requires_permission: boolean;

  @ManyToOne(() => UserPermission, (userPermission) => userPermission.menu_options)
  @JoinColumn({ name: 'user_permission_id' })
  user_permission: UserPermission;
}