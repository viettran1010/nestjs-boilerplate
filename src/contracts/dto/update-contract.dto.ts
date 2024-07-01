import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { AccountType, ContractStatus } from '../contracts.entity';

export class UpdateContractDto {
  @IsInt()
  @IsNotEmpty()
  user_id: number; // Added user_id property to match the service usage

  @IsInt()
  @IsNotEmpty()
  customer_id: number;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  customer_name_katakana: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(4)
  bank_code: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(3)
  branch_code: string;

  @IsEnum(AccountType)
  @IsNotEmpty()
  account_type: AccountType;
  
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(7)
  account_number: string;

  @IsString()
  @IsNotEmpty()
  opening_date: string;
  
  @IsString()
  @IsOptional()
  remarks: string;

  @IsInt()
  @IsNotEmpty()
  deposit_period: number;
  
  @IsString()
  @IsNotEmpty()
  maturity_date: string;

  @IsNumber()
  @IsNotEmpty()
  interest_rate: number;
  
  @IsEnum(ContractStatus)
  @IsNotEmpty()
  status: ContractStatus;
}