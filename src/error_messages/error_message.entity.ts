import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ErrorMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ length: 255 })
  error_icon: string;

  @Column('text')
  error_message: string;

  @Column('text')
  error_detail: string;

  @CreateDateColumn({ type: 'timestamp' })
  timestamp: Date;

  @Column('text')
  action_taken: string;

  @Column({ nullable: true })
  contract_id?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}