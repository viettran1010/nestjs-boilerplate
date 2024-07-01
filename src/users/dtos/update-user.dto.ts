import { IsEmail, IsOptional, IsString, IsInt, Min, Max, MinLength, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(2)
  @IsOptional()
  name?: string;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(150)
  age?: number;

  // Add other properties that can be updated with appropriate validation decorators
}