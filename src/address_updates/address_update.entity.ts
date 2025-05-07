import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Customer } from '../customers/customer.entity';
import { AuditLog } from '../audit_logs/audit_log.entity';

@Entity()
export class AddressUpdate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ nullable: true })
  file_attachment: string;

  @Column({ type: 'timestamp', nullable: true })
  date_to_start_converting: Date;

  @Column({ type: 'timestamp', nullable: true })
  date_of_end_converting: Date;

  @Column()
  status: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => AuditLog)
  @JoinColumn({ name: 'audit_log_id' })
  auditLog: AuditLog;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ nullable: true })
  address_update_file: string;

  // Method to create a new AddressUpdate entry
  static createAddressUpdate(user_id: number, address_update_file: string, date_to_start_converting: Date, date_of_end_converting: Date): AddressUpdate {
    const addressUpdate = new AddressUpdate();
    addressUpdate.user = { id: user_id } as User; // Associate with the correct User entity
    addressUpdate.address_update_file = address_update_file;
    addressUpdate.date_to_start_converting = date_to_start_converting;
    addressUpdate.date_of_end_converting = date_of_end_converting;
    addressUpdate.created_at = new Date(); // Set the created_at to the current datetime
    addressUpdate.updated_at = new Date(); // Set the updated_at to the current datetime
    return addressUpdate;
  }

  @BeforeInsert()
  updateDatesBeforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @BeforeUpdate()
  updateDatesBeforeUpdate() {
    this.updated_at = new Date();
  }
}