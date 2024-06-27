import { IsEnum, IsInt, IsNumber, IsOptional, IsString, MaxLength, MinLength, IsDate } from 'class-validator';

export enum AccountType {
  // Assuming the enum values based on typical account types
  Savings = 'savings',
  Checking = 'checking',
  Business = 'business',
}

export enum ContractStatus {
  // Assuming the enum values based on typical contract statuses
  Active = 'active',
  Closed = 'closed',
  Suspended = 'suspended',
}

export class UpdateContractDto {
  @IsInt()
  id: number;

  @IsString()
  @MaxLength(100)
  customer_name_katakana: string;

  @IsString()
  @MinLength(4)
  @MaxLength(4)
  bank_code: string;

  @IsString()
  @MinLength(3)
  @MaxLength(3)
  branch_code: string;

  @IsEnum(AccountType)
  account_type: AccountType;

  @IsString()
  @MaxLength(7)
  account_number: string;

  @IsDate()
  opening_date: Date;

  @IsOptional()
  @IsInt()
  deposit_period?: number;

  @IsOptional()
  @IsDate()
  maturity_date?: Date;

  @IsOptional()
  @IsNumber()
  interest_rate?: number;

  @IsEnum(ContractStatus)
  status: ContractStatus;

  @IsOptional()
  @IsString()
  remarks?: string;

- @IsInt()
- user_id: number;
}