import { Report } from '../reports/report.entity';
// import { Student } from '../students/student.entity'; // This line will be removed as it's already imported below
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm';
import { Student } from '../students/student.entity';

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

  @OneToMany(() => Report, (report) => report.user) // 1st arg to solve circular dependency
  reports: Report[];

  @Column({ nullable: true })
  @OneToMany(() => Student, (student) => student.user)
  students: Student[];

  age?: number;

  @Column()
  newIp?: Inet;

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
