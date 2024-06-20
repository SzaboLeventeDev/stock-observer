'use client';

import BaseCard from '@/components/BaseCard';
import { sendRequest } from '@/core/sendRequest';
import Quote from '@/types/quote';
import { Quote as QuoteApi } from '@/types/apis';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import convertQuoteResponse from '@/util/convertQuoteResponse';
import TrendingUpIcon from '@/icons/TrendingUp';
import TrendingDownIcon from '@/icons/TrendingDown';
import ClockIcon from '@/icons/Clock';
import DoubleDownIcon from '@/icons/DoubleDownArrow';
import DoubleUpArrowIcon from '@/icons/DoubleUpArrow';

export default function Page() {
  const { symbol } = useParams();
  const apiKey = process.env.NEXT_PUBLIC_STOCK_API_KEY ?? '';

  const [quote, setQuote] = useState<Quote | null>(null);
  const [priceOrPercentColor, setPriceOrPercentColor] = useState(
    'text-gray dark:text-white',
  );

  useEffect(() => {
    const fetchQuote = async () => {
      if (symbol) {
        const queryString: QuoteApi = {
          functionName: 'GLOBAL_QUOTE',
          symbol: symbol.toString(),
          datatype: 'json',
          apikey: apiKey,
        };

        try {
          const data = await sendRequest(queryString);
          const convertedQuote = convertQuoteResponse(data['Global Quote']);
          setQuote(convertedQuote);

          if (convertedQuote.change > 0) {
            setPriceOrPercentColor('text-green-deep');
          } else if (convertedQuote.change < 0) {
            setPriceOrPercentColor('text-red');
          } else {
            setPriceOrPercentColor('text-gray');
          }
        } catch (error) {
          console.error('Error fetching quote:', error);
        }
      }
    };
    fetchQuote();
  }, [symbol, apiKey]);

  if (!symbol)
    return (
      <div className="flex flex-col items-center justify-center h-full">
        Loading...
      </div>
    );

  return (
    <main>
      <div className="flex flex-col items-center">
        <div>chart</div>
        <h1 className="text-lg bold text-black dark:text-white">
          Details for {symbol}
        </h1>
        {quote && (
          <BaseCard className="w-80">
            <section className="flex justify-between">
              <div className="flex justify-center">
                <DoubleDownIcon />
                <span className="text-black dark:text-white">{quote.low}</span>
              </div>
              <div className="flex justify-between">
                <DoubleUpArrowIcon />
                <span className="text-black dark:text-white">{quote.high}</span>
              </div>
            </section>
            <section className="mt-4 mb-4">
              <h2 className="text-xl text-black dark:text-white text-center">
                {quote?.price}
              </h2>
              <div className="flex justify-center">
                {quote.price > 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
                <span className={`text-s ml-2 ${priceOrPercentColor}`}>
                  {quote.change} ({quote.changePercent})
                </span>
              </div>
            </section>
            <section className="flex items-center">
              <ClockIcon />
              <span className="text-black dark:text-white">{quote.open}</span>
            </section>
          </BaseCard>
        )}
      </div>
    </main>
  );
}
