import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Contract } from '../contracts/contract.entity';
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
  contract_id?: number;

  @ManyToOne(() => User, user => user.auditLogs)
  user_id?: number;

  @Column('timestamp')
  created_at: Date;

  @Column('timestamp')
  updated_at: Date;

  // Method to create a new AuditLog entry for "create_address_update" action
  static createAddressUpdateLog(user_id: number): AuditLog {
    const auditLog = new AuditLog();
    auditLog.action = 'create_address_update';
    auditLog.user_id = user_id;
    const currentDate = new Date();
    auditLog.timestamp = currentDate;
    auditLog.created_at = currentDate;
    auditLog.updated_at = currentDate;
    return auditLog;
  }

  // Relations with address_updates table will be defined when the AddressUpdate entity is available
  // @OneToMany(() => AddressUpdate, addressUpdate => addressUpdate.auditLog)
  // addressUpdates: AddressUpdate[];
}