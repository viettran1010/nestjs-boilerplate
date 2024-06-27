import { Report } from '../reports/report.entity';
import { Student } from '../students/student.entity';
import { Contract } from '../contracts/contract.entity';
import { ContractAction } from '../contract_actions/contract_action.entity';
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
  @Column({ nullable: true })
  contract_id?: number;

  @ManyToOne(() => ContractAction, contractAction => contractAction.user, { nullable: true })
  @Column({ nullable: true })
  contract_action_id?: number;

  @ManyToOne(() => AuditLog, auditLog => auditLog.user, { nullable: true })
  @Column({ nullable: true })
  audit_log_id?: number;

  @OneToMany(() => Report, (report) => report.user)
  @OneToMany(() => Student, (student) => student.user)
  students: Student[];

  reports: Report[];

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