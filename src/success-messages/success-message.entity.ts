import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
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

  @ManyToOne(() => User, user => user.successMessages, { eager: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Contract, contract => contract.successMessage)
  @JoinColumn({ name: 'contract_id' })
  contract: Contract;
}