import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateJanitorDto } from './create-janitor.dto';

export class UpdateJanitorDto extends PartialType(CreateJanitorDto) {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  @Min(18)
  @Max(65)
  age?: number;

  @IsString()
  @IsOptional()
  workShift?: string;
}