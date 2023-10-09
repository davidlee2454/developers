import { gql } from "@apollo/client";

export const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    exchangeRates {
      timestamp
      rates {
          country
          currency
          amount
          code
          rate
      }
    }
  }
`;