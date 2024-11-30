import { Report } from '../reports/report.entity';
import { Student } from '../student/student.entity';
import { Customer } from '../customers/customer.entity';
import { UserRole } from '../user_role/user_role.entity';
import { LoginAttempt } from '../login_attempt/login_attempt.entity';
import { UserPermission } from '../user_permissions/user_permission.entity';
import { AddressUpdate } from '../address_updates/address_update.entity';
import { SuccessMessage } from '../success_messages/success_message.entity';
import { ErrorMessage } from '../error_messages/error_message.entity';
import { Contract } from '../contracts/contract.entity';
import { ContractAction } from '../contract_action/contract_action.entity';
import { AuditLog } from '../audit_log/audit_log.entity';
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

  @ManyToOne(() => ContractAction, contractAction => contractAction.userEntity, { nullable: true })
  @JoinColumn({ name: 'contract_action_id' })
  contractAction?: ContractAction;

  @ManyToOne(() => AuditLog, auditLog => auditLog.userEntity, { nullable: true })
  @JoinColumn({ name: 'audit_log_id' })
  auditLog?: AuditLog;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @OneToMany(() => Student, (student) => student.userEntity)
  students: Student[];

  @OneToMany(() => UserRole, userRole => userRole.userEntity)
  userRoles: UserRole[];

  @OneToMany(() => LoginAttempt, loginAttempt => loginAttempt.userEntity)
  loginAttempts: LoginAttempt[];

  @OneToMany(() => UserPermission, userPermission => userPermission.userEntity)
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