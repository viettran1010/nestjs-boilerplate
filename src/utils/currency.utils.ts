const ISO_4217_CURRENCY_CODES = [
  'USD', 'EUR', 'JPY', 'GBP', 'AUD', 
  'CAD', 'CHF', 'CNY', 'HKD', 'NZD', 
  'SEK', 'KRW', 'SGD', 'NOK', 'MXN', 
  'INR', 'RUB', 'ZAR', 'TRY', 'BRL', 
  'TWD', 'DKK', 'PLN', 'THB', 'IDR', 
  'HUF', 'CZK', 'ILS', 'CLP', 'PHP', 
  'AED', 'COP', 'SAR', 'MYR', 'RON'
  // ... add all other ISO 4217 currency codes as needed
];

export function isValidCurrency(currencyCode) {
  return ISO_4217_CURRENCY_CODES.includes(currencyCode);
}