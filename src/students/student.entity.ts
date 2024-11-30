@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @ManyToOne(() => School, school => school.students)
  @Column({ nullable: true })
  school_id?: number;

  @ManyToOne(() => User, user => user.students)
  @Column({ nullable: true })
  user_id?: number;

  @Column('timestamp')
  created_at: Date;
}