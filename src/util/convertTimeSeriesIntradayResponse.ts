import { TimeSeriesIntradayResponseDto } from '@/types/DTOs/TimeSeriesIntradayResponseDto';
import { Interval } from '@/types/apis';
import {
  TimeSeriesIntraday,
  TimeSeriesIntradayWhole,
} from '@/types/timeSeriesIntraday';

/**
 * @function isInterval
 * @description Validate parameter if its type is Interval or not
 * @param {string} value Dto parameter to check.
 * @returns {value is Interval} Returns true or false.
 */
const isInterval = (value: string): value is Interval => {
  return ['1min', '5min', '15min', '30min', '60min'].includes(value);
};

/**
 * @function convertTimeSeriesIntradayResponse
 * @description Convert the incoming data.
 * @param {TimeSeriesIntradayResponseDto} dto Incoming data
 * @returns {Record<string, TimeSeriesIntraday>} Returns an object with metadata and keys of strings (actual dates) and the data about the trade in that period.
 */
const convertTimeSeriesIntradayResponse = (
  dto: TimeSeriesIntradayResponseDto,
): TimeSeriesIntradayWhole => {
  const timeSeries: Record<string, TimeSeriesIntraday> = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const [date, dataPoint] of Object.entries(dto['Time Series (5min)'])) {
    timeSeries[date] = {
      date,
      open: parseFloat(dataPoint['1. open']),
      high: parseFloat(dataPoint['2. high']),
      low: parseFloat(dataPoint['3. low']),
      close: parseFloat(dataPoint['4. close']),
      volume: parseFloat(dataPoint['5. volume']),
    };
  }

  const intervalString = dto['Meta Data']['4. Interval'];
  if (!isInterval(intervalString)) {
    throw new Error(`Invalid interval: ${intervalString}`);
  }

  const interval: Interval = intervalString;

  return {
    meatadata: {
      information: dto['Meta Data']['1. Information'],
      symbol: dto['Meta Data']['2. Symbol'],
      lastRefreshed: new Date(dto['Meta Data']['3. Last Refreshed']),
      interval,
      outputSize: dto['Meta Data']['5. Output Size'],
      timeZone: dto['Meta Data']['6. Time Zone'],
    },
    timeSeries,
  };
};

export default convertTimeSeriesIntradayResponse;
