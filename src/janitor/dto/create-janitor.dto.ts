import { IsString } from 'class-validator';

export class CreateJanitorDto {
  @IsString()
  name: string;

  @IsString()
  department: string;
}