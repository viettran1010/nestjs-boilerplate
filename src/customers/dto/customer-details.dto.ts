import { Expose } from 'class-transformer';

export class CustomerDetailsDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly name: string;

  @Expose()
  readonly name_katakana: string;

  @Expose()
  readonly company_name: string;

  @Expose()
  readonly zip_code: string;

  @Expose()
  readonly address: string;

  @Expose()
  readonly phone_number: string;

  @Expose()
  readonly email_address: string;

  @Expose()
  readonly date_of_birth: Date;

  @Expose()
  readonly contact_date: Date;

  @Expose()
  readonly remarks: string;
}