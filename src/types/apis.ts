/**
 * @type Search
 * @description Type of the query string in the search request.
 */
export type Search = {
  functionName: 'SYMBOL_SEARCH';
  keywords: string;
  datatype?: 'json' | 'csv';
  apikey: string;
};

/**
 * @type Quote
 * @description Type of the query string in the detail page when asking the stock details.
 */
export type Quote = {
  functionName: 'GLOBAL_QUOTE';
  symbol: string;
  datatype?: 'json' | 'csv';
  apikey: string;
};

export type QueryString = Search | Quote;
