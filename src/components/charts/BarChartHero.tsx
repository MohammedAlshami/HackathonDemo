"use client";

import { BarChart } from "./BarChart";
const chartdata = [
  {
    date: "Jan 23",
    Harvest: 2890,
    Workers: 2338,
  },
  {
    date: "Feb 23",
    Harvest: 2756,
    Workers: 2103,
  },
  {
    date: "Mar 23",
    Harvest: 3322,
    Workers: 2194,
  },
  {
    date: "Apr 23",
    Harvest: 3470,
    Workers: 2108,
  },
  {
    date: "May 23",
    Harvest: 3475,
    Workers: 1812,
  },
  {
    date: "Jun 23",
    Harvest: 3129,
    Workers: 1726,
  },
  {
    date: "Jul 23",
    Harvest: 3490,
    Workers: 1982,
  },
  {
    date: "Aug 23",
    Harvest: 2903,
    Workers: 2012,
  },
  {
    date: "Sep 23",
    Harvest: 2643,
    Workers: 2342,
  },
  {
    date: "Oct 23",
    Harvest: 2837,
    Workers: 2473,
  },
  {
    date: "Nov 23",
    Harvest: 2954,
    Workers: 3848,
  },
  {
    date: "Dec 23",
    Harvest: 3239,
    Workers: 3736,
  },
];

export const BarChartHero = () => (
  <BarChart
    className="h-80"
    data={chartdata}
    index="date"
    categories={["Harvest", "Workers"]}
    valueFormatter={(number: number) =>
      `MYR ${Intl.NumberFormat("us").format(number).toString()}`
    }
    onValueChange={(v) => console.log(v)}
  />
);
