import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @Min(0)
  @Max(1000000)
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  maker: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @Min(1930)
  @IsNotEmpty()
  year: number;

  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  @IsNotEmpty()
  mileage: number;
}