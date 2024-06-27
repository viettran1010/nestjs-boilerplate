import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  customerId: number;

  @Expose()
  name: string;

  @Expose()
  katakana: string;

  @Expose()
  email: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  emailAddress: string;
}