import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity'; // Assuming User entity exists
import { Contract } from '../contracts/contract.entity'; // Assuming Contract entity exists

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

  @ManyToOne(() => User, user => user.errorMessages, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Contract, contract => contract.errorMessages)
  @JoinColumn({ name: 'contract_id' })
  contract_id: number;
}