export interface Rate {
  country: string,
  currency: string,
  amount: number,
  code: string,
  rate: number,
}

export interface ExchangeRate {
  timestamp: number,
  rates: Rate[],
}