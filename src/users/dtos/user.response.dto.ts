import { Expose } from 'class-transformer';
import { User } from '../users.entity';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}