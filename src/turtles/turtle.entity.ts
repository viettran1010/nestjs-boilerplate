import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Location } from '../locations/location.entity';

@Entity()
export class Turtle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'varchar' })
  species: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar' })
  health_status: string;

  @ManyToOne(() => Location, (location) => location.turtles)
  @Column({ type: 'int' })
  location_id: number;
}