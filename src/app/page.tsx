'use client';

import SearchField from '@/components/SearchField';
import StockSummaryCard from '@/components/StockSummaryCard';
import { SearchResponseBestMatchesDto } from '@/types/DTOs/SearchResponseDto';
import { Stock } from '@/types/stock';
import convertStockResponse from '@/util/convertStockResponse';
import { useState } from 'react';
import Link from 'next/link';

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
    const apikey = process.env.NEXT_PUBLIC_STOCK_API_KEY ?? '';

    const response = await fetch(
      `/api/search?functionName=SYMBOL_SEARCH&keywords=${keywords}&apikey=${apikey}`,
    );

    const data: SearchResponseBestMatchesDto = await response.json();
    if (data.bestMatches) {
      const convertedStocks = data.bestMatches.map((dto) =>
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
              <Link key={stock.symbol} href={`/${stock.symbol}`}>
                <StockSummaryCard
                  stock={stock}
                  index={index}
                  animate={animateSearchField}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
