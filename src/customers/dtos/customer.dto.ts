import { Expose } from 'class-transformer';

export class CustomerDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  katakana?: string;

  @Expose()
  phone_number?: string;

  @Expose()
  email_address?: string;
}