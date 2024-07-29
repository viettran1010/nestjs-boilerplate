import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsNumber, IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @IsPositive()
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
  @IsPositive()
  @Min(1930)
  @IsNotEmpty()
  year: number;

  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;

  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(1000000)
  @IsNotEmpty()
  mileage: number;
}