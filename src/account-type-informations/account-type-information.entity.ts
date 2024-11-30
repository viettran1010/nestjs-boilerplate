import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class AccountTypeInformation {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'decimal', nullable: true })
  deposit_amount: number;

  @Column({ type: 'timestamp', nullable: true })
  deposit_date: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}