import { Transform } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
  IsNotEmpty,
} from 'class-validator';

export class GetEstimateDto {
  @IsString()
  maker: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @Transform(({ value }) => parseInt(value))
  @Min(1930)
  year: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  lat: number;

  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}