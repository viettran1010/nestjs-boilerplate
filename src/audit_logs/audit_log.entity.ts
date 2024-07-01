import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum AuditActionType {
  // ... other members ...
  UPDATE_REMARKS = 'UPDATE_REMARKS',
  // ... other members ...
}

@Entity()