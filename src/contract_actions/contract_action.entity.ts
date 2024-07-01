import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Contract } from './contract.entity';
import { User } from './user.entity';

@Entity('contract_actions')
export class ContractAction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contract, contract => contract.contractActions)
  @Column({ nullable: true })
  contract_id?: number;

  @ManyToOne(() => User, user => user.contractAction)
  @Column({ nullable: true })
  user_id?: number;

  @Column('timestamp')
  created_at: Date;
}