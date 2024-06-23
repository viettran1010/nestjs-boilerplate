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

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;
}

import { Matches } from 'class-validator';

export class ResetPasswordConfirmDto {
  @IsString()
  @IsNotEmpty({ message: 'reset_token is required' })
  reset_token: string;

  @IsString()
  @IsNotEmpty({ message: 'password is required' })
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message: 'Password is invalid',
  })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'password_confirmation is required' })
  password_confirmation: string;
}

// Ensure to remove the old token and password properties from the ResetPasswordConfirmDto
// if they are no longer needed, as they seem to be placeholders from the initial code.

export class ResetPasswordConfirmDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}