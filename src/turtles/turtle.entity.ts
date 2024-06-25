import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsString, IsNumber, IsEnum } from 'class-validator';
import { Location } from '../locations/location.entity';

export enum HealthStatus {
  HEALTHY = 'healthy',
  SICK = 'sick',
  RECOVERING = 'recovering',
}

@Entity()
export class Turtle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @IsString()
  @Column({ type: 'varchar' })
  species: string;

  @IsNumber()
  @Column({ type: 'int' })
  age: number;

  @IsEnum(HealthStatus)
  @Column({ type: 'varchar' })
  health_status: HealthStatus;

  @ManyToOne(() => Location, (location) => location.turtles)
  @IsNumber()
  @Column({ type: 'int' })
  location_id: number;
}