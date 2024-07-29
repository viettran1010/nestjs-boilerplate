import { IsNumber, IsString } from 'class-validator';

export class UpdateContractStatusDto {
  @IsNumber()
  id: number;

  @IsString()
  status: string;
}