import { QuoteResponseDto } from '@/types/DTOs/QuoteResponseDto';
import Quote from '@/types/quote';

const convertQuoteResponse = (dto: QuoteResponseDto): Quote => {
  return {
    symbol: dto['01. symbol'],
    open: Number(dto['02. open']),
    high: Number(dto['03. high']),
    low: Number(dto['04. low']),
    price: Number(dto['05. price']),
    volume: Number(dto['06. volume']),
    latestTradingDay: new Date(dto['07. latest trading day']),
    previousClose: Number(dto['08. previous close']),
    change: Number(dto['09. change']),
    changePercent: dto['10. change percent'],
  };
};

export default convertQuoteResponse;
