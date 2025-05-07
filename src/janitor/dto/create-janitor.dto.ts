import { IsString, IsNotEmpty } from 'class-validator';

export class CreateJanitorDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly department: string;
}