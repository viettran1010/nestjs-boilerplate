import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Contract } from '../contracts/contract.entity';
import { User } from '../users/user.entity';
import { AddressUpdate } from '../address_updates/address_update.entity';
import { SuccessMessage } from '../success_messages/success_message.entity';
import { ErrorMessage } from '../error_messages/error_message.entity';

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => AddressUpdate, addressUpdate => addressUpdate.auditLog)
  addressUpdates: AddressUpdate[];

  @OneToMany(() => SuccessMessage, successMessage => successMessage.auditLog)
  successMessages: SuccessMessage[]; // This line is correct, no change needed

  @OneToMany(() => ErrorMessage, errorMessage => errorMessage.errorMessages)
  errorMessages: ErrorMessage[];

  @Column()
  action: string;

  @Column('timestamp')
  timestamp: Date;

  @ManyToOne(() => Contract, contract => contract.auditLogs)
  @Column({ nullable: true })
  contract_id?: number;

  @ManyToOne(() => User, user => user.auditLogs)
  @Column({ nullable: true }) // This line is correct, no change needed
  user_id?: number;

  @Column('timestamp')
  created_at: Date;

  @Column('timestamp')
  updated_at: Date;

  // Relations with address_updates table will be defined when the AddressUpdate entity is available
  // @OneToMany(() => AddressUpdate, addressUpdate => addressUpdate.auditLog)
  // addressUpdates: AddressUpdate[];
}