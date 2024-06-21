import { IsString, IsInt, IsFloat } from 'class-validator';

export class GetEstimateDto {
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
}