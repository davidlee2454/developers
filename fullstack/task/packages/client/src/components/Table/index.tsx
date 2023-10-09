import React from 'react';
import styled from "styled-components";
import { Rate } from 'src/types';

export interface ITableComponentProps {
  rates: Rate[],
}

export const Table = styled.table`
    td,
    th {
        padding: 10px;
    }

    th {
        background: #1C76E2;
        color: white;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    tr:hover {
        background-color: #ddd;
    }
`

export const TableComponent: React.FC<ITableComponentProps> = (props) => {
  const { rates } = props;

  return (
    <Table>
      <thead>
        <tr>
          <th scope="col">Country</th>
          <th scope="col">Currency</th>
          <th scope="col">Amount</th>
          <th scope="col">Code</th>
          <th scope="col">Rate</th>
        </tr>
      </thead>
      <tbody>
        {
          rates && rates.map((rate: Rate, index: number) =>
            <tr key={index}>
              <td>{rate.country}</td>
              <td>{rate.currency}</td>
              <td>{rate.amount}</td>
              <td>{rate.code}</td>
              <td>{rate.rate}</td>
            </tr>
          )
        }
      </tbody>
    </Table>
  )
}