import { IsEnum, IsFloat, IsInt, IsNotEmpty, IsOptional, IsString, IsDate } from 'class-validator';

export enum AccountType {
  Savings,
  Checking,
  // Add other account types as needed
}

export class CreateContractDto {
  @IsString()
  @IsNotEmpty()
  customer_name_katakana: string;

  @IsString()
  @IsNotEmpty()
  bank_code: string;

  @IsString()
  @IsNotEmpty()
  branch_code: string;

  @IsEnum(AccountType)
  account_type: AccountType;

  @IsString()
  @IsNotEmpty()
  account_number: string;

  @IsDate()
  @IsNotEmpty()
  opening_date: Date;

  @IsInt()
  @IsNotEmpty()
  deposit_period: number;

  @IsDate()
  @IsNotEmpty()
  maturity_date: Date;

  @IsFloat()
  @IsNotEmpty()
  interest_rate: number;

  @IsString()
  @IsOptional()
  remarks?: string;

  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsInt()
  @IsNotEmpty()
  customer_id: number;
}