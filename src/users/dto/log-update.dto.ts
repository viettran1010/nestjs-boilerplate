import { IsEnum, IsDate, IsNumber } from 'class-validator';

export enum ActionType {
  UPDATE = 'update',
}

export class LogUpdateDto {
  @IsEnum(ActionType)
  action: ActionType;

  @IsDate()
  timestamp: Date;

  @IsNumber()
  contract_id: number;
}