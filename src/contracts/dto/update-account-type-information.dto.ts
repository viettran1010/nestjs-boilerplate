import { IsNumber, IsDateString } from 'class-validator';

export class UpdateAccountTypeInformationDto {
  @IsNumber()
  depositAmount: number;

  @IsDateString()
  depositDate: Date;
}