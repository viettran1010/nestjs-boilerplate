import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'date' })
  enrollment_date: Date;

  @Column({ type: 'varchar' })
  status: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @Column({ type: 'varchar', length: 255 })
  encrypted_password: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  reset_password_token: string;

  @Column({ type: 'timestamp', nullable: true })
  reset_password_sent_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  remember_created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  current_sign_in_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  last_sign_in_at: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  current_sign_in_ip: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  last_sign_in_ip: string;

  @Column({ type: 'int', default: 0 })
  sign_in_count: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password_confirmation: string;

  @Column({ type: 'timestamp', nullable: true })
  locked_at: Date;

  @Column({ type: 'int', default: 0 })
  failed_attempts: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  unlock_token: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  confirmation_token: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  unconfirmed_email: string;

  @Column({ type: 'timestamp', nullable: true })
  confirmed_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  confirmation_sent_at: Date;
}