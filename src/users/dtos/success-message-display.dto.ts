import { IsNumber, IsString } from 'class-validator';

export class SuccessMessageDisplayDto {
  @IsNumber()
  user_id: number;

  @IsString()
  message: string;

  @IsString()
  detail: string;
}