import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { EXCHANGE_RATES } from "./gqls";
import { Rate } from "./types";
import { TableComponent } from "./components/Table";
import { timestampToText } from "./utils";

const tableHeaders = [
    {
        key: 'country',
        value: 'Country',
    },
    {
        key: 'currency',
        value: 'Currency',
    },
    {
        key: 'amount',
        value: 'Amount',
    },
    {
        key: 'code',
        value: 'Code',
    },
    {
        key: 'rate',
        value: 'Rate',
    }
]

function App() {
    const { loading, error, data } = useQuery(EXCHANGE_RATES);
    const [rates, setRates] = useState<Rate[]>([]);
    const [timestamp, setTimestamp] = useState<number>(0);

    useEffect(() => {
        if (data) {
            const { exchangeRates } = data;
            if (exchangeRates) {
                console.log('exchangeRates: ', exchangeRates);
                setRates([...exchangeRates.rates]);
                setTimestamp(exchangeRates.timestamp);
            }
        }
    }, [data]);

    useEffect(() => {
        console.log(rates);
    }, [rates]);

    return <>
        <span>{timestampToText(timestamp)}</span>
        <TableComponent
            headers={tableHeaders}
            rows={rates}
        />
    </>;
}

export default App;
