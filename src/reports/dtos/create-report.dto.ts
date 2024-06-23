import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
  IsEmail,
  IsNotEmpty,
  Matches,
  IsOptional,
} from 'class-validator';

export enum GrantType {
  PASSWORD = 'password',
  REFRESH_TOKEN = 'refresh_token',
}

export class CreateReportDto {
  @IsEmail()
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'password is required' })
  @Matches(/\A(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}\z/, { message: 'Password is invalid' })
  password: string;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;

  @IsString()
  maker: string;

  @IsString()
  model: string;

  @IsNotEmpty({ message: 'grant_type is required' })
  grant_type: GrantType;

  @IsString()
  @IsOptional()
  client_id?: string;

  @IsString()
  @IsOptional()
  client_secret?: string;

  @IsString()
  @IsOptional()
  refresh_token?: string;

  @IsString()
  @IsNotEmpty({ message: 'scope is required' })
  scope: string;

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