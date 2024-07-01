import { IsEnum, IsInt, IsNotEmpty, IsDate } from 'class-validator';
import { ActionType } from '../audit_log.entity';

export class CreateAuditLogDto {
  @IsEnum(ActionType)
  @IsNotEmpty()
  action: ActionType;

  @IsDate()
  @IsNotEmpty()
  timestamp: Date;

  @IsInt()
  @IsNotEmpty()
  contract_id: number;

  @IsInt()
  @IsNotEmpty()
  user_id: number;
}