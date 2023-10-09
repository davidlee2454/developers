
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { EXCHANGE_RATES } from "./gqls";
import { Rate } from "./types";
import { TableComponent } from "./components/Table";
import { timestampToText } from "./utils";

const Span = styled.span`
  margin: 16px 16px 32px 16px;
`

function App() {
  const { loading, data } = useQuery(EXCHANGE_RATES);
  const [rates, setRates] = useState<Rate[]>([]);
  const [timestamp, setTimestamp] = useState<number>(0);

  useEffect(() => {
    if (data) {
      const { exchangeRates } = data;
      if (exchangeRates) {
        setRates([...exchangeRates.rates]);
        setTimestamp(exchangeRates.timestamp);
      }
    }
  }, [data]);

  return <>
    <Span>{loading ? 'loading...' : timestampToText(timestamp)}</Span>
    <TableComponent
      rates={rates}
    />
  </>;
}

export default App;
