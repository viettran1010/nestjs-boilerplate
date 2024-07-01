import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Contract } from '../contracts/contract.entity';
import { AddressUpdate } from '../address_updates/address_update.entity';
import { User } from '../users/user.entity';

export enum AuditActionType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: AuditActionType })
  action: AuditActionType;

  @Column('timestamp')
  timestamp: Date;

  @ManyToOne(() => Contract, contract => contract.auditLogs)
  contract: Contract;

  @ManyToOne(() => User, user => user.auditLogs)
  user: User;

  @ManyToOne(() => AddressUpdate, addressUpdate => addressUpdate.auditLogs)
  @Column({ nullable: true })
  address_update_id?: number;

  @Column('timestamp')
  created_at: Date;

  @Column('timestamp')
  updated_at: Date;

  @OneToMany(() => AddressUpdate, addressUpdate => addressUpdate.auditLogs)
  addressUpdates: AddressUpdate[];
}