import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateJanitorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
export class CreateJanitorDto {}