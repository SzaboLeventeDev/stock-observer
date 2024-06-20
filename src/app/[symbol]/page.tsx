'use client';

import BaseCard from '@/components/BaseCard';
import { sendRequest } from '@/core/sendRequest';
import Quote from '@/types/quote';
import {
  Interval,
  Quote as QuoteApi,
  TimeSeriesIntraday as TimeSeriesIntradayApi,
} from '@/types/apis';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import convertQuoteResponse from '@/util/convertQuoteResponse';
import TrendingUpIcon from '@/icons/TrendingUp';
import TrendingDownIcon from '@/icons/TrendingDown';
import ClockIcon from '@/icons/Clock';
import DoubleDownIcon from '@/icons/DoubleDownArrow';
import DoubleUpArrowIcon from '@/icons/DoubleUpArrow';
import LineChart from '@/components/LineChart';
import BaseButton from '@/components/ui/BaseButton';
import { TimeSeriesIntraday } from '@/types/timeSeriesIntraday';
import convertTimeSeriesIntradayResponse from '@/util/convertTimeSeriesIntradayResponse';

export default function Page() {
  const { symbol } = useParams();
  const apiKey = process.env.NEXT_PUBLIC_STOCK_API_KEY ?? '';

  const [quote, setQuote] = useState<Quote | null>(null);
  const [selectedInterval, setSelectedInterval] = useState<Interval>('5min');
  const [chartData, setChartData] =
    useState<Record<string, TimeSeriesIntraday>>();
  const [priceOrPercentColor, setPriceOrPercentColor] = useState(
    'text-gray dark:text-white',
  );

  /**
   * @function handleIntervalSelection
   * @description Select the interval to update the chart view.
   * @param {Interval} interval Selected interval.
   * @returns {void} Not returning any value.
   */
  const handleIntervalSelection = (interval: Interval): void => {
    setSelectedInterval(interval);
  };
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
          // eslint-disable-next-line no-console
          console.error('Error fetching quote:', error);
        }
      }
    };

    const fetchTimeSeriesIntraday = async () => {
      try {
        const queryString: TimeSeriesIntradayApi = {
          functionName: 'TIME_SERIES_INTRADAY',
          symbol: symbol.toString(),
          interval: selectedInterval,
          datatype: 'json',
          apikey: apiKey,
        };

        const response = await sendRequest(queryString);
        const convertedData = convertTimeSeriesIntradayResponse(response);

        setChartData(convertedData.timeSeries);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching intraday data: ', error);
      }
    };

    fetchQuote();
    fetchTimeSeriesIntraday();
  }, [symbol, apiKey, selectedInterval]);

  if (!symbol)
    return (
      <div className="flex flex-col items-center justify-center h-full">
        Loading...
      </div>
    );

  return (
    <main>
      <div className="flex flex-col items-center">
        {chartData && <LineChart data={chartData} />}
        <div className="flex gap-2 mb-3 overflow:x-auto">
          <BaseButton
            text="1 min"
            buttonClick={() => handleIntervalSelection('1min')}
          />
          <BaseButton
            text="5 min"
            buttonClick={() => handleIntervalSelection('5min')}
          />
          <BaseButton
            text="15 min"
            buttonClick={() => handleIntervalSelection('15min')}
          />
          <BaseButton
            text="30 min"
            buttonClick={() => handleIntervalSelection('30min')}
          />
          <BaseButton
            text="60 min"
            buttonClick={() => handleIntervalSelection('60min')}
          />
        </div>
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
                {quote.change > 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}
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
