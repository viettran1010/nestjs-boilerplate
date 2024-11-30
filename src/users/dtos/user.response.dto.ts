import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsDate, IsEmail } from 'class-validator';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  customerId?: number;

  @IsOptional()
  @IsString()
  @Expose()
  name?: string;

  @IsOptional()
  @IsString()
  @Expose()
  nameKatakana?: string;

  // Add other customer details following the same pattern
  // ...
}