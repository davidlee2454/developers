export type TableHeader = {
  key: string,
  value: string,
}

export interface Rate {
  country: string,
  currency: string,
  amount: string,
  code: string,
  rate: string,
}

export interface ExchangeRate {
  timestap: string,
  rates: Rate[],
}