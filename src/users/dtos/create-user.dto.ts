import { IsEmail, IsString, IsEnum, IsDate, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

enum ActionType {
  UPDATE_ACCOUNT_TYPE_INFORMATION = 'update_account_type_information',
  // ... other possible actions
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(ActionType)
  action: ActionType;

  @IsDate()
  @Type(() => Date)
  timestamp: Date;

  @IsInt()
  contract_id: number;

  @IsInt()
  user_id: number;
}