type DataType = 'json' | 'csv';
export type Interval = '1min' | '5min' | '15min' | '30min' | '60min';
type OutputSize = 'compact' | 'full';

/**
 * @type Search
 * @description Type of the query string in the search request.
 */
export type Search = {
  functionName: 'SYMBOL_SEARCH';
  keywords: string;
  datatype?: DataType;
  apikey: string;
};

/**
 * @type Quote
 * @description Type of the query string in the detail page when asking the stock details.
 */
export type Quote = {
  functionName: 'GLOBAL_QUOTE';
  symbol: string;
  datatype?: DataType;
  apikey: string;
};

/**
 * @type TimeSeriesIntraday
 * @description Type of the query string to retrieve daily trading data for the chart.
 */
export type TimeSeriesIntraday = {
  functionName: 'TIME_SERIES_INTRADAY';
  symbol: string;
  interval: Interval;
  apikey: string;
  adjusted?: boolean;
  extended_hours?: boolean;
  month?: string;
  outputsize?: OutputSize;
  datatype?: DataType;
};

export type QueryString = Search | Quote | TimeSeriesIntraday;
