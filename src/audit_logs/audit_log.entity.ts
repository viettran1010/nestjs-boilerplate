import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Contract } from '../contracts/contract.entity';
import { User } from '../users/user.entity';
import { AddressUpdate } from '../address_updates/address_update.entity';

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

  @ManyToOne(() => AddressUpdate, addressUpdate => addressUpdate.auditLogs)
  @Column({ nullable: true })
  address_update_id?: number;

  @Column('timestamp')
  created_at: Date;

  @Column('timestamp')
  updated_at: Date;

  @OneToMany(() => AddressUpdate, addressUpdate => addressUpdate.auditLog)
  addressUpdates: AddressUpdate[];
}