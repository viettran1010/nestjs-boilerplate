import { Report } from '../reports/report.entity';
import { Student } from '../student/student.entity';
import { LoginAttempt } from './login-attempt.entity';
import { Contract } from '../contracts/contract.entity';
import { ContractAction } from '../contract/contract_action.entity';
import { AuditLog } from '../audit/audit_log.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
  ManyToOne,
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

  @OneToMany(() => LoginAttempt, loginAttempt => loginAttempt.user)
  loginAttempts: LoginAttempt[];

  // ... other columns or relationships

  @ManyToOne(() => Contract, contract => contract.user, { nullable: true })
  @Column({ nullable: true })
  contract_id?: number;

  @ManyToOne(() => ContractAction, contractAction => contractAction.user)
  @Column({ nullable: true })
  contract_action_id?: number;

  @ManyToOne(() => AuditLog, auditLog => auditLog.user, { nullable: true })
  @Column({ nullable: true })
  audit_log_id?: number;

  @OneToMany(() => Report, report => report.user)
  @OneToMany(() => Student, student => student.user)
  students: Student[];

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