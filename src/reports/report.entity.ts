import { User } from '../users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  approved: boolean;

  @Column()
  price: number;

  @Column()
  maker: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @Column()
  mileage: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  encrypted_password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
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

  @Column({ type: 'int', nullable: true })
  sign_in_count: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  password_confirmation: string;

  @Column({ type: 'timestamp', nullable: true })
  locked_at: Date;

  @Column({ type: 'int', nullable: true })
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

  @ManyToOne(() => User, (user) => user.reports) // 1st arg to solve circular dependency
  user: User;
}