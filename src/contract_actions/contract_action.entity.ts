import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class ContractAction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  actionType: string;

  @ManyToOne(() => User, user => user.contractAction)
  user: User;
}