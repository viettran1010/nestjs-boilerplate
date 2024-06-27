import { Expose, Exclude } from 'class-transformer';

export class CustomerResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  name_katakana: string;

  @Expose()
  company_name: string;

  @Expose()
  zip_code: string;

  @Expose()
  address: string;

  @Expose()
  phone_number: string;

  @Expose()
  email_address: string;

  @Expose()
  date_of_birth: Date;

  @Expose()
  contact_date: Date;

  @Expose()
  remarks: string;

  @Exclude()
  user_id: number;

  @Exclude()
  katakana: string;

  @Exclude()
  address_update_id: number;
}