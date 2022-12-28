import { Expose, Transform } from 'class-transformer';

export class ReportResponseDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  maker: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  lat: number;

  @Expose()
  lng: number;

  @Expose()
  mileage: number;

  @Transform(({ obj }) => obj.id)
  @Expose()
  userId: number;

  @Expose()
  approved: boolean;
}
