import { IsNotEmpty } from 'class-validator';

export class ResetPasswordConfirmDto {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  password: string;
}