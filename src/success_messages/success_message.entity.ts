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

  @Column()
  message: string;

  @Column({ nullable: true })
  detail: string;

  @Column({ type: 'timestamp', nullable: true })
  displayed_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  closed_at: Date;

  @ManyToOne(() => User, user => user.successMessages)
  user: User;

  @ManyToOne(() => Contract, contract => contract.successMessages)
  contract: Contract;

  @Column({ nullable: true })
  contract_id: number;
}