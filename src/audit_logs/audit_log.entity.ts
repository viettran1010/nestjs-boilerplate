import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Contract } from '../contracts/contract.entity';
import { ErrorMessage } from '../error_messages/error_message.entity';
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
  @Column({ nullable: true })
  contract_id?: number;

  @ManyToOne(() => User, user => user.auditLogs)
  @Column({ nullable: true })
  user_id?: number;

  @Column('timestamp')
  created_at: Date;

  @Column('timestamp')
  updated_at: Date;

  @OneToMany(() => ErrorMessage, errorMessage => errorMessage.auditLog)
  errorMessages: ErrorMessage[];

  // Relations with address_updates table will be defined when the AddressUpdate entity is available
  // @OneToMany(() => AddressUpdate, addressUpdate => addressUpdate.auditLog)
  // addressUpdates: AddressUpdate[];
}