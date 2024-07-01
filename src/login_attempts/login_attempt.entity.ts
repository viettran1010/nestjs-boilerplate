import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class LoginAttempt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  timestamp: Date;

  @ManyToOne(() => User, user => user.loginAttempts)
  user: User;
}