import { IsDateString, IsNumber } from 'class-validator';

export class ValidateAddressUpdateDto {
  @IsNumber()
  userId: number;

  @IsDateString()
  dateToStartConverting: string;

  @IsDateString()
  dateOfEndConverting: string;
}