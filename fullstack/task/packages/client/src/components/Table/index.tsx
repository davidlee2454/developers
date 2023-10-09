import React from 'react';

export interface ITableComponentProps {
  className?: string,
  headers: {
    key: string,
    value: string,
  }[],
  rows: any,
}

export const TableComponent: React.FC<ITableComponentProps> = (props) => {
  const { headers, rows, className } = props;

  return (
    <table className={`min-w-full text-left text-sm font-light ${className}`}>
      <thead className="border-b font-medium">
        <tr>
          {
            headers.map(row =>
              <th key={row.key} scope="col" className="px-6 py-4">{row.value}</th>
            )
          }
        </tr>
      </thead>
      <tbody>
        {
          rows && rows.map((row: any, index: number) =>
            <tr
              key={index}
              className="border-b transition duration-300 ease-in-out hover:bg-neutral-100">
              {
                headers.map((header, index) =>
                  <td key={index} className="whitespace-nowrap px-6 py-4">{row[header.key]}</td>
                )
              }
            </tr>
          )
        }
      </tbody>
    </table>
  )
}