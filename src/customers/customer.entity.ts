import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  name: string;

  @Column()
  name_katakana: string;

  @Column()
  company_name: string;

  @Column()
  zip_code: string;

  @Column()
  address: string;

  @Column()
  phone_number: string;

  @Column()
  email_address: string;

  @Column()
  date_of_birth: Date;

  @Column()
  contact_date: Date;

  @Column()
  remarks: string;

  @ManyToOne(() => User, (user) => user.customers)
  user: User;

  @Column()
  katakana: string;
}