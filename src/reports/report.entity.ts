ădawdwaădwadwaawdawdawdawawdawdimport { User } from '../users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  approved: boolean;

  @Column()
  price: number;

  @Column()
  maker: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lat: number;

  @Column()
  lng: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Column()
  mileage: number;

  @Column('hello', { nullable: true })
  hello?: string;

  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
