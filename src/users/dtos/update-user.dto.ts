import { IsEmail, IsOptional, IsString, IsInt, Min, Max } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  // Add additional properties with validation decorators as needed for your business logic
  // For example:
  @IsString()
  @IsOptional()
  password?: string;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(150)
  age?: number;
}