import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ApproveReportDto {
  @IsBoolean()
  approved: boolean;

  @IsNotEmpty()
  @IsString()
  token: string;
}