import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmEmailDto {
  @IsString({ message: 'confirmation_token must be a string' })
  @IsNotEmpty({ message: 'confirmation_token is required' })
  confirmation_token: string;
}