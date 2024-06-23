import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
  IsNotEmpty,
} from 'class-validator';

export class CreateReportDto {
  @IsNumber({ message: 'Price must be a number' })
  @Min(0, { message: 'Price must be at least 0' })
  @Max(1000000, { message: 'Price must be less than 1000000' })
  price: number;

  @IsString({ message: 'Maker must be a string' })
  @IsNotEmpty({ message: 'Maker is required' })
  maker: string;

  @IsString({ message: 'Model must be a string' })
  @IsNotEmpty({ message: 'Model is required' })
  model: string;

  @Min(1930, { message: 'Year must be at least 1930' })
  year: number;

  @IsLatitude({ message: 'Latitude is not valid' })
  lat: number;

  @IsLongitude({ message: 'Longitude is not valid' })
  lng: number;

  @IsNumber({ message: 'Mileage must be a number' })
  @Min(0, { message: 'Mileage must be at least 0' })
  @Max(1000000, { message: 'Mileage must be less than 1000000' })
  mileage: number;
}