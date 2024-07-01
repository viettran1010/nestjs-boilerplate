import { IsString, IsNumber, IsOptional, IsEnum, ValidateIf } from 'class-validator';

export enum AccountType {
  Savings = 'savings',
  Checking = 'checking',
}

export enum ContractStatus {
  Active = 'active',
  Closed = 'closed',
}

export class ContractDetailsDto {
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

  @IsString()
  opening_date: Date;

  @IsOptional()
  @IsNumber()
  deposit_period?: number;

  @IsOptional()
  @IsString()
  maturity_date?: Date;

  @IsOptional()
  @IsNumber({}, { allowNaN: false, maxDecimalPlaces: 2 })
  interest_rate?: number;

  @IsEnum(ContractStatus, { message: 'status must be a valid enum value' })
  status: string;

  @ValidateIf(o => o.user_id !== null)
  @IsNumber()
  user_id?: number;

  // Removed duplicate user_id declaration
  @IsOptional()
  @IsNumber()
  contract_action_id?: number;

  @IsOptional()
  @IsNumber()
  customer_id?: number;

  @IsOptional()
  @IsNumber()
  audit_log_id?: number;

  @IsOptional()
  @IsString()
  remarks?: string;
}