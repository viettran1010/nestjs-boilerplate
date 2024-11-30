import {
  IsInt,
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDate,
  ValidateIf,
  IsNotEmpty,
  MaxDate,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AccountType } from '../../enums/account-type.enum';

export class ContractValidationDto {
  @IsInt({ message: 'Contract ID is required and must be an integer.' })
  contract_id: number;

  @IsInt({ message: 'Customer ID is required and must be an integer.' })
  customer_id: number;

  @IsString({ message: 'Customer name in Katakana is required.' })
  customer_name_katakana: string;

  @IsString({ message: 'Bank code is required.' })
  bank_code: string;

  @IsString({ message: 'Branch code is required.' })
  branch_code: string;

  @IsEnum(AccountType, { message: 'Account type is required.' })
  account_type: AccountType;

  @IsString({ message: 'Account number is required.' })
  account_number: string;

  @IsDate({ message: 'Opening date is required and must be a valid date not in the future.' })
  @MaxDate(new Date(), { message: 'Opening date cannot be in the future.' })
  @Type(() => Date)
  opening_date: Date;

  @IsInt({ message: 'Deposit period is required and must be an integer.' })
  deposit_period: number;

  @IsDate({ message: 'Maturity date is required, must be a valid date, and after the opening date.' })
  @ValidateIf(o => o.maturity_date > o.opening_date, { message: 'Maturity date must be after the opening date.' })
  @Type(() => Date)
  maturity_date: Date;

  @IsNumber({}, { message: 'Interest rate is required and must be a valid number.' })
  @Min(0, { message: 'Interest rate cannot be negative.' })
  interest_rate: number;

  @IsOptional()
  @IsString({ message: 'Invalid remarks format.' })
  remarks?: string;
}