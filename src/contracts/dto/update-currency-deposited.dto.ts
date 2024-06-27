import { IsString } from 'class-validator';

export class UpdateCurrencyDepositedDto {
  @IsString()
  currencyDeposited: string;
}