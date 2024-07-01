import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Contract } from '../contracts/contract.entity';
import { User } from '../users/user.entity';
import { AddressUpdate } from '../address_updates/address_update.entity';

export enum AuditLogAction {
  INVALID_FILE_FORMAT = 'invalid_file_format',
  // ... other actions can be added here
}

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: AuditLogAction,
  })
  action: AuditLogAction;

  @Column('timestamp')
  timestamp: Date;

  @ManyToOne(() => Contract, contract => contract.auditLogs)
  @Column({ nullable: true })
  contracts: Contract[];

  @ManyToOne(() => User, user => user.auditLogs)
  @Column({ nullable: true })
  user_id?: number;

  @ManyToOne(() => AddressUpdate, addressUpdate => addressUpdate.auditLogs)
  @Column({ nullable: true })
  address_update_id?: number;

  @Column('timestamp')
  created_at: Date;

  @Column('timestamp')
  updated_at: Date;

  // Relations with address_updates table are now defined
  @OneToMany(() => AddressUpdate, addressUpdate => addressUpdate.auditLog)
  addressUpdates: AddressUpdate[];
}