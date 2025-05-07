import { IsDate, IsEnum, IsFloat, IsInt, IsOptional, IsString, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export enum AccountType {
  // Enum values based on the project's specific account types
  SAVINGS,
  CHECKING,
  // ... other account types
}

export enum ContractStatus {
  // Enum values based on the project's specific contract statuses
  ACTIVE,
  INACTIVE,
  // ... other contract statuses
}

export class CreateContractDto {
  @IsString({ message: 'Customer name in Katakana is required.' })
  customer_name_katakana: string;

  @IsString({ message: 'Bank code is required.' })
  bank_code: string;

  @IsString({ message: 'Branch code is required.' })
  branch_code: string;

  @IsEnum(AccountType, { message: 'Account type is required.' })
  account_type: AccountType;

  @IsString({ message: 'Account number is required.' })
  @Matches(/^[0-9]+$/, { message: 'Account number must be numeric.' })
  account_number: string;

  @IsDate({ message: 'Opening date is required.' })
  @Type(() => Date)
  opening_date: Date;

  @IsInt({ message: 'Deposit period is required.' })
  deposit_period: number;

  @IsDate({ message: 'Maturity date is required.' })
  @Type(() => Date)
  maturity_date: Date;

  @IsFloat({ message: 'Interest rate is required.' })
  interest_rate: number;

  @IsEnum(ContractStatus, { message: 'Status is required.' })
  status: ContractStatus;

  @IsInt({ message: 'User ID is required.' })
  user_id: number;

  @IsInt({ message: 'Customer ID is required.' })
  customer_id: number;

  @IsOptional()
  @IsString({ message: 'Invalid remarks format.' })
  remarks?: string;
}