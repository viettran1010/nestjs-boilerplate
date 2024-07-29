import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Contract } from '../contracts/contract.entity';

@Entity()
export class ContractAction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action_type: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @OneToMany(() => Contract, contract => contract.contractAction)
  contracts: Contract[];
}