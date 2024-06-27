import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateJanitorDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly age: number;

  @IsString()
  readonly nationality: string;

  @IsString()
  @IsOptional()
  readonly certification?: string;
}
export class CreateJanitorDto {}