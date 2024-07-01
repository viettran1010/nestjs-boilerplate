import { IsDate, IsEnum, IsNumber, IsInt, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export enum AccountType {
  // Assuming the enum values based on typical account types
  CHECKING = 'checking',
  SAVINGS = 'savings',
  OTHER = 'other',
}

export enum ContractStatus {
  // Assuming the enum values based on typical contract statuses
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CLOSED = 'closed',
}

export class ContractDetailsResponseDto {
  @IsInt()
  customer_id: number;

  @IsString()
  @IsOptional()
  customer_name_katakana?: string;

  @IsString()
  bank_code: string;

  @IsString()
  branch_code: string;

  @IsString()
  account_type: string;

  @IsString()
  account_number: string;

  @IsDate()
  @Type(() => String)
  opening_date: string;

  @IsString()
  @IsOptional()
  remarks?: string;

  @IsInt()
  @IsOptional()
  deposit_period?: number;

  @IsDate()
  @Type(() => String)
  maturity_date?: string;

  @IsNumber()
  @IsOptional()
  interest_rate?: number;

  @IsString()
  status: string;

  @IsString()
  @IsOptional()
  currency_deposited?: string;

  @IsNumber()
  @IsOptional()
  deposit_amount?: number;

  @IsDate()
  @Type(() => String)
  deposit_date?: string;

  // Additional customer details, optional if not available
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  name_katakana?: string;
}