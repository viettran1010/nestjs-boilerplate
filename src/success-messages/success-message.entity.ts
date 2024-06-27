import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Contract } from '../contracts/contract.entity';

@Entity()
export class SuccessMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'varchar', length: 255 })
  message: string;

  @Column({ type: 'text', nullable: true })
  detail?: string;

  @Column({ type: 'timestamp', nullable: true })
  displayed_at?: Date;

  @Column({ type: 'timestamp', nullable: true })
  closed_at?: Date;

  @ManyToOne(() => User, user => user.id)
  @Column({ type: 'int' })
  user_id: number;

  @ManyToOne(() => Contract, contract => contract.id)
  @Column({ type: 'int' })
  contract_id: number;
}