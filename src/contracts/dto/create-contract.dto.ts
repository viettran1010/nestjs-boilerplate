import { IsNotEmpty, IsString } from 'class-validator';

export class CreateContractDto {
+ @IsString()
+ @IsNotEmpty()
  bank_code: string;

+ @IsString()
+ @IsNotEmpty()
  account_number: string;
}