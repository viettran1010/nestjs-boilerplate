import { IsNotEmpty, IsString } from 'class-validator';

export class ActionFeedbackDto {
  @IsString()
  @IsNotEmpty()
  action: string;
}