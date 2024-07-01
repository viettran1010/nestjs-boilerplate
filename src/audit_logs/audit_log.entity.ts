import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Contract } from '../contracts/contract.entity';
import { AddressUpdate } from '../address_updates/address_update.entity';
import { OneToMany } from 'typeorm';
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
  @JoinColumn({ name: 'contract_id' })
  contract_id?: number;

  @ManyToOne(() => User, user => user.auditLogs)
  @Column({ nullable: true })
  user_id?: number;

  @ManyToOne(() => AddressUpdate, addressUpdate => addressUpdate.auditLogs)
  @JoinColumn({ name: 'address_update_id' })
  address_update_id?: number;

  @Column('timestamp')
  created_at: Date;

  @Column('timestamp')
  updated_at: Date;
  
  // Relations with address_updates table are now defined
  @OneToMany(() => AddressUpdate, addressUpdate => addressUpdate.auditLog)
  addressUpdates: AddressUpdate[];
}