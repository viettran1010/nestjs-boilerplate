import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity'; // Ensure this path is correct
import { Contract } from '../contracts/contract.entity';
import { AddressUpdate } from '../address_updates/address_update.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  contract_id?: number;

  @Column() // Ensure other properties are correctly defined
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  name: string;

  @Column({ nullable: true }) // Ensure other properties are correctly defined
  name_katakana?: string;

  @Column({ nullable: true }) // Ensure other properties are correctly defined
  zip_code?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true }) // Ensure other properties are correctly defined
  phone_number?: string;

  @Column({ nullable: true }) // Ensure other properties are correctly defined
  email_address?: string;

  @Column({ type: 'timestamp', nullable: true })
  contact_date?: Date;

  @Column({ type: 'text', nullable: true })
  remarks?: string;

  @ManyToOne(() => User, user => user.customers) // Ensure this relationship is correct
  user: User;

  @OneToMany(() => Contract, contract => contract.customer)
  contracts: Contract[];

  // Other relationships will be defined here when the corresponding entities are available
}