import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Turtle } from './turtle.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column()
  name: string;

  @Column('double precision')
  lat: number;

  @Column('double precision')
  lng: number;

  @OneToMany(() => Turtle, (turtle) => turtle.location)
  turtles: Turtle[];
}