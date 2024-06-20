import { Interval } from './apis';

export type TimeSeriesIntradayMetaData = {
  information: string;
  symbol: string;
  lastRefreshed: Date;
  interval: Interval;
  outputSize: string;
  timeZone: string;
};

export type TimeSeriesIntraday = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type TimeSeriesIntradayWhole = {
  meatadata: TimeSeriesIntradayMetaData;
  timeSeries: Record<string, TimeSeriesIntraday>;
};
