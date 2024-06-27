import { IsString, IsNumber } from 'class-validator';

export class CreateJanitorDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  workShift: string;
}