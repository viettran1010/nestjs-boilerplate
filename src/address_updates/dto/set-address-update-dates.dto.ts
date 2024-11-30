import { IsNumber, IsString, Matches } from 'class-validator';

export class SetAddressUpdateDatesDto {
  @IsNumber()
  userId: number;

  @IsString()
  @Matches(/^\d{4}\/\d{2}\/\d{2}$/, {
    message: 'Invalid start date format.',
  })
  dateToStartConverting: string;

  @IsString()
  @Matches(/^\d{4}\/\d{2}\/\d{2}$/, {
    message: 'Invalid end date format.',
  })
  dateOfEndConverting: string;
}