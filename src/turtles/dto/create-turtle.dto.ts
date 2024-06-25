import { IsEnum, IsInt, IsString, Min } from 'class-validator';

export enum HealthStatus {
  HEALTHY = 'healthy',
  SICK = 'sick',
  RECOVERING = 'recovering',
}

export class CreateTurtleDto {
  @IsString()
  species: string;

  @IsInt()
  @Min(0)
  age: number;

  @IsEnum(HealthStatus)
  health_status: HealthStatus;

  @IsInt()
  location_id: number;
}