import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  katakana: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  emailAddress: string;
}