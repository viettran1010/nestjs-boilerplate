import { IsBoolean } from 'class-validator';

export class ApproveReportDto {
  @IsBoolean()
  approved: boolean;
}

import { IsString, IsNotEmpty } from 'class-validator';

export class VerifyReportDto {
  @IsString()
  @IsNotEmpty({ message: 'confirmation_token is required' })
  confirmation_token: string;
}