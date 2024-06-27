import { IsNumber } from 'class-validator';

export class DismissErrorMessageDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  errorMessageId: number;
}