import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsNumber()
  @IsNotEmpty()
  readonly authorId: number;

  @IsDate()
  @IsNotEmpty()
  readonly date: Date;
}