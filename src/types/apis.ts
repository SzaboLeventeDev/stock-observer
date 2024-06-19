export type Search = {
  functionName: 'SYMBOL_SEARCH';
  keywords: string;
  datatype?: 'json' | 'csv';
  apikey: string;
};

export type QueryString = Search;
