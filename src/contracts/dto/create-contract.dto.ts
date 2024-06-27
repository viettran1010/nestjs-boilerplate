import { IsNotEmpty, IsString, IsEnum, IsNumber, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { AccountType } from '../enums/account-type.enum';

export class CreateContractDto {
  @IsString()
  @IsNotEmpty()
  customer_name_katakana: string;

  @IsString()
  @IsNotEmpty()
  branch_code: string;

  @IsEnum(AccountType)
  @IsNotEmpty()
  account_type: AccountType;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  opening_date: Date;

  @IsNumber()
  @IsNotEmpty()
  deposit_period: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  maturity_date: Date;

  @IsNumber()
  @IsNotEmpty()
  interest_rate: number;

  @IsString()
  @IsOptional()
  remarks?: string;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  customer_id: number;

  @IsString()
  @IsNotEmpty()
  bank_code: string;

  @IsString()
  @IsNotEmpty()
  account_number: string;
}