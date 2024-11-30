import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Contract } from '../contracts/contract.entity';

@Entity()
export class ErrorMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  error_icon: string;

  @Column({ type: 'varchar', length: 255 })
  error_message: string;

  @Column({ type: 'text', nullable: true })
  error_detail: string;

  @Column({ type: 'bigint' })
  timestamp: number;

  @Column({ type: 'text', nullable: true })
  action_taken: string;

  @ManyToOne(() => User, user => user.id)
  @Column({ type: 'int' })
  user_id: number;

  @ManyToOne(() => Contract, contract => contract.id)
  @Column({ type: 'int' })
  contract_id: number;
}