import { Report } from '../reports/report.entity';
import { Student } from '../students/student.entity'; // Correct the path if necessary
import { Customer } from '../customers/customer.entity'; // Correct the path if necessary
import { UserRole } from '../user_roles/user_role.entity'; // Correct the path if necessary
import { LoginAttempt } from '../login_attempts/login_attempt.entity'; // Correct the path if necessary
import { UserPermission } from '../user_permissions/user_permission.entity'; // Correct the path if necessary
import { AddressUpdate } from '../address_updates/address_update.entity'; // Correct the path if necessary
import { SuccessMessage } from '../success_messages/success_message.entity'; // Correct the path if necessary
import { ErrorMessage } from '../error_messages/error_message.entity'; // Correct the path if necessary
import { Contract } from '../contracts/contract.entity'; // Correct the path if necessary
import { ContractAction } from '../contract_actions/contract_action.entity'; // Correct the path if necessary
import { AuditLog } from '../audit_logs/audit_log.entity'; // Correct the path if necessary
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

  @ManyToOne(() => ContractAction, contractAction => contractAction.user, { nullable: true })
  @JoinColumn({ name: 'contract_action_id' })
  contractAction?: ContractAction;

  // @ManyToOne(() => AuditLog, auditLog => auditLog.user, { nullable: true }) // Remove or correct the relationship
  // @JoinColumn({ name: 'audit_log_id' })
  // auditLog?: AuditLog;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @OneToMany(() => Student, (student) => student.user)
  students: Student[];

  @OneToMany(() => UserRole, userRole => userRole.user) // Ensure UserRole has a 'user' property
  userRoles: UserRole[];

  @OneToMany(() => LoginAttempt, loginAttempt => loginAttempt.user) // Ensure LoginAttempt has a 'user' property
  loginAttempts: LoginAttempt[];

  @OneToMany(() => UserPermission, userPermission => userPermission.user) // Ensure UserPermission has a 'user' property
  userPermissions: UserPermission[];

  @ManyToOne(() => Customer, customer => customer.user, { nullable: true })
  @JoinColumn({ name: 'customer_id' })
  customer?: Customer;

  // Add other OneToMany relationships here following the same pattern
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