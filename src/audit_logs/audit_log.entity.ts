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
  @Column({ nullable: true })
  contract_id?: number;

  @ManyToOne(() => User, user => user.auditLogs)
  @Column({ nullable: true })
  user_id?: number;

  @OneToMany(() => AddressUpdate, addressUpdate => addressUpdate.auditLog)
  addressUpdates: AddressUpdate[];

  @Column('timestamp')
  created_at: Date;

  @Column('timestamp')
  updated_at: Date;
}