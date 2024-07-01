import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export enum ActionTaken {
  CLOSE = 'close',
  RETRY = 'retry',
  // Add other enum values as needed
}

export class LogErrorMessageDto {
  @IsInt()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  error_icon: string;

  @IsString()
  @IsNotEmpty()
  error_message: string;

  @IsString()
  @IsNotEmpty()
  error_detail: string;

  @Type(() => Date)
  timestamp: Date;

  @IsEnum(ActionTaken)
  action_taken: ActionTaken;
}