import { Expose } from 'class-transformer';

export class ContractResponseDto {
  @Expose()
  id: number;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;

  @Expose()
  customer_name_katakana: string;

  @Expose()
  bank_code: string;

  @Expose()
  branch_code: string;

  @Expose()
  account_type: string;

  @Expose()
  account_number: string;

  @Expose()
  opening_date: Date;

  @Expose()
  remarks: string;

  @Expose()
  deposit_period: number;

  @Expose()
  maturity_date: Date;

  @Expose()
  interest_rate: number;

  @Expose()
  status: string;

  @Expose()
  user_id: number;

  @Expose()
  contract_action_id: number;

  @Expose()
  customer_id: number;

  @Expose()
  audit_log_id: number;

  @Expose()
  currency_deposited: string;

  @Expose()
  deposit_amount: number;

  @Expose()
  deposit_date: Date;
}