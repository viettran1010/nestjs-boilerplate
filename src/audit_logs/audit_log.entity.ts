import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Contract } from '../contracts/contract.entity';
import { AddressUpdate } from '../address_updates/address_update.entity';
import { User } from '../users/user.entity';

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string;

  @Column('timestamp')
  timestamp: Date;

  @ManyToOne(() => Contract, contract => contract.auditLogs)
  contract: Contract;

  @ManyToOne(() => User, user => user.auditLogs)
  user: User;

  @OneToMany(() => AddressUpdate, addressUpdate => addressUpdate.auditLog)
  addressUpdates: AddressUpdate[];

  @Column('timestamp')
  created_at: Date;

  @Column('timestamp')
  updated_at: Date;
}