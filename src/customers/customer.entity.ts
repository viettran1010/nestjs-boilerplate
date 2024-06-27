import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Contract } from '../contracts/contract.entity';
import { AddressUpdate } from '../address_updates/address_update.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  // Retain the nullable fields from the new code
  @Column({ nullable: true })
  contract_id?: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  name: string;

  // Merge the nullable fields from the new code with the existing fields
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

  // Merge the date fields with the existing fields
  @Column({ type: 'date', nullable: true })
  date_of_birth?: Date;

  @Column({ type: 'timestamp', nullable: true })
  contact_date?: Date;

  // Merge the text fields with the existing fields
  @Column({ type: 'text', nullable: true })
  remarks?: string;

  // Retain the relationships from the new code
  @ManyToOne(() => User, user => user.customers)
  user: User;

  // Add the new relationship with Contract
  @ManyToOne(() => Contract, contract => contract.customers)
  contract: Contract;

  // Add the new relationship with AddressUpdate
  @OneToMany(() => AddressUpdate, addressUpdate => addressUpdate.customer)
  addressUpdates: AddressUpdate[];

  // Remove the redundant 'katakana' field from the current code
  // as it is already included as 'name_katakana' in the new code
}
