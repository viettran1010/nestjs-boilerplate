import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Contract } from '../contracts/contract.entity';
import { AddressUpdate } from '../address_updates/address_update.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  name_katakana?: string;

  @Column({ nullable: true })
  company_name?: string;

  @Column({ nullable: true })
  zip_code?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  phone_number?: string;

  @Column({ nullable: true })
  email_address?: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth?: Date;

  @Column({ type: 'timestamp', nullable: true })
  contact_date?: Date;

  @Column({ type: 'text', nullable: true })
  remarks?: string;

  @ManyToOne(() => User, user => user.customers)
  user: User; // This line should be updated

  @ManyToOne(() => Contract, contract => contract.customers, { nullable: true })
  contract?: Contract; // This line should be updated

  @OneToMany(() => AddressUpdate, addressUpdate => addressUpdate.customer)
  addressUpdates?: AddressUpdate[];
}