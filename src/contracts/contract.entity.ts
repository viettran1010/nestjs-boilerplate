import { BaseEntity } from 'typeorm';
import { User } from './user.entity';
import { AuditLog } from './audit-log.entity';

@Entity()
export class Contract extends BaseEntity {
  // ... other properties and decorators

  @ManyToOne(() => User, user => user.contracts)
  user: User;
}