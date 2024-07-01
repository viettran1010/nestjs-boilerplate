import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateContractDto { // Renamed class to match the expected DTO
  @IsString()
  @IsNotEmpty()
  remarks: string;
}