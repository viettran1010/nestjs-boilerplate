import { IsNumber } from 'class-validator';

export class DismissErrorMessageDto {
  @IsNumber({}, { message: 'userId must be a number' })
  userId: number;

  @IsNumber({}, { message: 'errorMessageId must be a number' })
  errorMessageId: number;
}