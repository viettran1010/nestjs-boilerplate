import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsEmail,
  IsString,
  Matches,
  MinLength,
  Max,
  Min,
} from 'class-validator';

export class ReportsRegistrationDto {
  @IsEmail({}, { message: 'Email is invalid' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password is invalid' })
  @Matches(/\A(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}\z/, {
    message: 'Password is invalid',
  })
  password: string;

  @IsString()
  password_confirmation: string;
}

export class CreateReportDto {
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;

  @IsString()
  maker: string;

  @IsString()
  model: string;

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