import { IsDate, IsEnum, IsFloat, IsInt, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export enum AccountType {
  // Assuming the enum values based on typical account types
  CHECKING = 'checking',
  SAVINGS = 'savings',
  OTHER = 'other',
}

export enum ContractStatus { 
  APPROVED = 'Approved',
  DENIED = 'Denied',
}

export class ContractDetailsResponseDto {
  @IsInt()
  customer_id: number;

  @IsString()
  customer_name_katakana: string;

  @IsString()
  bank_code: string;

  @IsString()
  branch_code: string;

  @IsEnum(AccountType)
  account_type: AccountType;

  @IsString()
  account_number: string;

  @IsDate()
  @Type(() => Date)
  opening_date: Date;

  @IsString()
  @IsOptional()
  remarks: string;

  @IsInt()
  deposit_period: number;

  @IsDate()
  @Type(() => Date)
  maturity_date: Date;

  @IsFloat()
  interest_rate: number;

  @IsEnum(ContractStatus)
  status: ContractStatus;

  @IsString()
  currency_deposited: string;

  @IsFloat()
  deposit_amount: number;

  @IsDate()
  @Type(() => Date)
  deposit_date: Date;

  // Additional customer details
  @IsString()
  name: string;

  @IsString()
  name_katakana: string;
}