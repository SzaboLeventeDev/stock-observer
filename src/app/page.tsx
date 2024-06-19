'use client';

import SearchField from '@/components/SearchField';
import StockSummaryCard from '@/components/StockSummaryCard';
import { SearchResponseBestMatchesDto } from '@/types/DTOs/SearchResponseDto';
import { Search } from '@/types/apis';
import { Stock } from '@/types/stock';
import convertStockResponse from '@/util/convertStockResponse';
import { sendRequest } from '@/core/sendRequest';
import { useState } from 'react';

export default function Home() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [animateSearchField, setAnimateSearchField] = useState(false);

  /**
   * @function handleSearch
   * @description Manage to get details from the server and renders them based on the value of the input field. Value should be symbol.
   * @param {string} keywords Value of the input field.
   * @returns {Promise<void>} Dose not return any value.
   */
  const handleSearch = async (keywords: string): Promise<void> => {
    const queryString: Search = {
      functionName: 'SYMBOL_SEARCH',
      keywords,
      datatype: 'json',
      apikey: process.env.NEXT_PUBLIC_STOCK_API_KEY ?? '',
    };

    const response: SearchResponseBestMatchesDto =
      await sendRequest(queryString);
    if (response.bestMatches) {
      const convertedStocks = response.bestMatches.map((dto) =>
        convertStockResponse(dto),
      );
      setStocks(convertedStocks);
      setAnimateSearchField(true);
    }
  };
  return (
    <main
      className={`flex flex-col items-center ${stocks.length > 0 ? 'h-full pt-16' : 'justify-center min-h-screen'}`}
    >
      <SearchField onSearch={handleSearch} animate={animateSearchField} />
      {stocks.length > 0 && (
        <div className="w-full flex-1 overflow-y-auto mt-4 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
            {stocks.map((stock, index) => (
              <StockSummaryCard
                key={stock.symbol}
                stock={stock}
                index={index}
                animate={animateSearchField}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
