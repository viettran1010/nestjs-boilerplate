import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
  IsEmail,
  MinLength,
} from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;

  @IsString()
  maker: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  year: number;

  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, {
    message: 'Password must be longer than or equal to 8 characters',
  })
  password: string;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}