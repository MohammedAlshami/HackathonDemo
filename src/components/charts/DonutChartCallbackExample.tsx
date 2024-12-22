"use client";

import React from "react";

import { DonutChart, TooltipProps } from "./DonutChart";
interface DataItem {
  name: string;
  amount: number;
}

const data: DataItem[] = [
  {
    name: "Land Acquisition",
    amount: 50000,
  },
  {
    name: "Seedlings",
    amount: 12000,
  },
  {
    name: "Fertilizers",
    amount: 8000,
  },
  {
    name: "Labor Costs",
    amount: 15000,
  },
  {
    name: "Pesticides",
    amount: 5000,
  },
  {
    name: "Maintenance",
    amount: 10000,
  },
  {
    name: "Harvesting Equipment",
    amount: 20000,
  },
];

export function DonutChartCallbackExample() {
  const [datas, setDatas] = React.useState<TooltipProps | null>(null);

  const sumNumericArray = (arr: number[]): number =>
    arr.reduce((sum, num) => sum + num, 0);

  const currencyFormatter = (number: number) =>
    `MYR ${Intl.NumberFormat("us").format(number)}`;

  const payload = datas?.payload?.[0];
  const value = payload?.value ?? 0;

  const formattedValue = payload
    ? currencyFormatter(value)
    : currencyFormatter(
        sumNumericArray(data.map((dataPoint) => dataPoint.amount))
      );

  return (
    <div className="w-full h-full">
      <p className="text-center text-sm text-gray-700 dark:text-gray-300">
        Costs by category
      </p>
      <p className="mt-2 w-full text-center text-xl font-semibold text-gray-900 dark:text-gray-50">
        {formattedValue}
      </p>
      <DonutChart
        data={data}
        category="name"
        value="amount"
        className="mx-auto mt-8"
        colors={["blue", "violet", "cyan", "emerald"]}
        tooltipCallback={(props) => {
          if (props.active) {
            setDatas((prev) => {
              if (prev?.payload[0].category === props.payload[0].category)
                return prev;
              return props;
            });
          } else {
            setDatas(null);
          }
          return null;
        }}
      />
    </div>
  );
}
