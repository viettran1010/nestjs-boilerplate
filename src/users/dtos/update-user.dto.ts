import { IsString, IsEmail, IsNumber, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly firstName?: string;

  @IsString()
  @IsOptional()
  readonly lastName?: string;

  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsNumber()
  @IsOptional()
  readonly age?: number;
}