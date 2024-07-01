import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Contract } from '../contracts/contract.entity';
import { User } from '../users/user.entity';

export enum AuditAction {
  CONTRACT_REGISTRATION = 'contract_registration',
  // other actions can be added here
}

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: AuditAction,
  })
  action: AuditAction;

  @Column('timestamp')
  timestamp: Date;

  @ManyToOne(() => Contract, contract => contract.auditLogs)
  @Column({ nullable: true })
  contract_id?: number;

  @ManyToOne(() => User, user => user.auditLog)
  @Column({ nullable: true })
  user_id?: number;

  @Column('timestamp')
  created_at: Date;

  @Column('timestamp')
  updated_at: Date;

  // Relations with address_updates table will be defined when the AddressUpdate entity is available
  // @OneToMany(() => AddressUpdate, addressUpdate => addressUpdate.auditLog)
  // addressUpdates: AddressUpdate[];
}