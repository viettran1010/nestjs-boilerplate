import { Report } from '../reports/report.entity';
import { Student } from '../students/student.entity'; // Assuming this path is correct
import { Customer } from '../customers/customer.entity'; // Assuming this path is correct
import { UserRole } from '../user_roles/user_role.entity'; // Assuming this path is correct
import { LoginAttempt } from '../login_attempts/login_attempt.entity'; // Assuming this path is correct
import { UserPermission } from '../user_permissions/user_permission.entity'; // Assuming this path is correct
import { AddressUpdate } from '../address_updates/address_update.entity'; // Assuming this path is correct
import { SuccessMessage } from '../success_messages/success_message.entity'; // Assuming this path is correct
import { ErrorMessage } from '../error_messages/error_message.entity'; // Assuming this path is correct
import { Contract } from '../contracts/contract.entity'; // Assuming this path is correct
import { ContractAction } from '../contract_actions/contract_action.entity'; // Assuming this path is correct
import { AuditLog } from '../audit_logs/audit_log.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ default: true })
  admin: boolean;

  @Column()
  password: string;

  @ManyToOne(() => Contract, contract => contract.user, { nullable: true })
  @JoinColumn({ name: 'contract_id' })
  contract?: Contract;

  @ManyToOne(() => ContractAction, contractAction => contractAction.user)
  @JoinColumn({ name: 'contract_action_id' })
  contractAction?: ContractAction;

  @ManyToOne(() => AuditLog, auditLog => auditLog.user, { nullable: true })
  @JoinColumn({ name: 'audit_log_id' })
  auditLog?: AuditLog;

  @OneToMany(() => Report, report => report.user)
  reports: Report[];

  @OneToMany(() => Student, student => student.user)
  students: Student[];

  @OneToMany(() => UserRole, userRole => userRole.user)
  userRoles: UserRole[];

  @OneToMany(() => LoginAttempt, loginAttempt => loginAttempt.user)
  loginAttempts: LoginAttempt[];

  @OneToMany(() => UserPermission, userPermission => userPermission.user)
  userPermissions: UserPermission[];

  @ManyToOne(() => Customer, customer => customer.user, { nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer?: Customer;

  // Add other OneToMany relationships here following the same pattern if needed
  // ...

  @Column({ nullable: true })
  age?: number;

  @AfterInsert()
  logInsert() {
    console.log('Inserted user with id: ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with id: ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user with id: ', this.id);
  }
}