import { IsString, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateJanitorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(18)
  @Max(65)
  age: number;

  @IsNotEmpty()
  @IsString()
  workShift: string;
}