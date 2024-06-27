import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateJanitorDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly department?: string;
}