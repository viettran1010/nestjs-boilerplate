import { IsNumber, IsString } from 'class-validator';

export class UpdateCurrencyDepositedDto {
  @IsNumber()
  id: number;

  @IsString()
  currencyDeposited: string;
}