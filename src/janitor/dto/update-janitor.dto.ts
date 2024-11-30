import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { CreateJanitorDto } from './create-janitor.dto';

@IsOptional()
@IsString()
@Min(0)
@Max(100)
export class UpdateJanitorDto extends PartialType(CreateJanitorDto) {}