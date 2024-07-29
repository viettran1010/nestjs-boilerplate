import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateContractDto {
  // Define the properties and validation decorators for the update contract DTO
  // Example:
  @IsString()
  remarks: string;
}

export class UpdateContractRemarksDto {
  @IsString()
  @IsNotEmpty()
  remarks: string;
}