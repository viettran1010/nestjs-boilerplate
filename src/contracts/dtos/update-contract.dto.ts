import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateContractRemarksDto {
  @IsString()
  @IsNotEmpty()
  remarks: string;
}