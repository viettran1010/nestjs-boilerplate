import { IsEnum, IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { ActionTaken } from '../error_message.entity';

export class LogErrorMessageDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  errorIcon: string;

  @IsString()
  @IsNotEmpty()
  errorMessage: string;

  @IsString()
  @IsNotEmpty()
  errorDetail: string;

  @Type(() => Date)
  @IsNotEmpty()
  timestamp: Date;

  @IsEnum(ActionTaken)
  @ValidateIf(o => o.actionTaken !== undefined)
  actionTaken: ActionTaken = ActionTaken.CLOSE;
}