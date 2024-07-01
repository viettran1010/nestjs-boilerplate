import { IsString, IsNotEmpty } from 'class-validator';

// Define UpdateContractDto with the necessary validation rules
export class UpdateContractDto {
  // Add properties and validation decorators as needed
  // Example:
  // @IsString()
  // propertyName: string;
}

export class UpdateContractRemarksDto {
  @IsString()
  @IsNotEmpty()
  remarks: string;
}