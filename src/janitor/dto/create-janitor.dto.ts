import { IsString, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateJanitorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(18)
  @Max(65)
  age: number;

  @IsString()
  @IsNotEmpty()
  workShift: string;
}