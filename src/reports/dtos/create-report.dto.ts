import { IsString, IsInt, IsFloat, IsOptional } from 'class-validator';

export class CreateReportDto {
  @IsString()
  maker: string;

  @IsString()
  model: string;

  @IsInt()
  year: number;

  @IsFloat()
  lat: number;

  @IsFloat()
  lng: number;

  @IsInt()
  mileage: number;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  passwordConfirmation?: string;
}