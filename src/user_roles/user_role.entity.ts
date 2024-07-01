import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @ManyToOne(() => User, user => user.userRoles)
  user: User;
}