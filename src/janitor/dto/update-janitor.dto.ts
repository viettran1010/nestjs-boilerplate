import { PartialType } from '@nestjs/mapped-types';
import { CreateJanitorDto } from './create-janitor.dto';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateJanitorDto extends PartialType(CreateJanitorDto) {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  age?: number;
}