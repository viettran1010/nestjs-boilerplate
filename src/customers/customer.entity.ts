import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Contract } from '../contracts/contract.entity';
import { AddressUpdate } from '../address_updates/address_update.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  contract_id?: number;

  @Column() // Ensure this is the correct type and format for the created_at field
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  name: string;

  @Column({ nullable: true })
  name_katakana?: string;

  @Column({ nullable: true })
  zip_code?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true }) // Ensure this is the correct type and format for the phone_number field
  phone_number?: string;

  @Column({ nullable: true })
  email_address?: string;

  @Column({ type: 'timestamp', nullable: true })
  contact_date?: Date;

  @Column({ type: 'text', nullable: true })
  remarks?: string;

  @ManyToOne(() => User, user => user.customers)
  user: User;

  @OneToMany(() => Contract, contract => contract.customer)
  contract: Contract;
}