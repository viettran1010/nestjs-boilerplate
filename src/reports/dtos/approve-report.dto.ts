import { IsBoolean, IsInt } from 'class-validator';

export class ApproveReportDto {
  @IsInt()
  id: number;

  @IsBoolean()
  approved: boolean;
}