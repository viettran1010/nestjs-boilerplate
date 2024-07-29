import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
  IsEmail,
  Matches,
  MinLength, // Added import for MinLength
} from 'class-validator';

export class CreateReportDto {
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;

  @IsEmail({}, { message: 'Email is invalid' }) // Updated decorator with custom message
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be longer than 8 characters' }) // Added MinLength decorator with custom message
  @Matches(
    new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'),
    {
      message: 'Password is invalid',
    },
  )
  password: string;

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

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}