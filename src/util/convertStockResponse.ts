import { SearchResponseDto } from '@/types/DTOs/SearchResponseDto';
import { Stock } from '@/types/stock';
import formatTime from './formatDate';

const convertStockResponse = (dto: SearchResponseDto): Stock => {
  const marketOpenTime = dto['5. marketOpen'];
  const marketCloseTime = dto['6. marketClose'];
  const currentDate = new Date();

  const marketOpenString = `${currentDate.toISOString().split('T')[0]}T${marketOpenTime}:00.000Z`;
  const marketOpenDate = new Date(marketOpenString);
  const marketOpen = formatTime(marketOpenString); // TODO
  const marketCloseString = `${currentDate.toISOString().split('T')[0]}T${marketCloseTime}:00.000Z`;
  const marketCloseDate = new Date(marketCloseString);
  const marketClose = formatTime(marketCloseString); // TODO

  console.log('converter', {
    dto,
    marketOpenString,
    marketOpenDate,
    marketOpenTime,
    marketCloseString,
    marketCloseDate,
    marketCloseTime,
    marketOpen,
    marketClose,
  });
  return {
    symbol: dto['1. symbol'],
    name: dto['2. name'],
    type: dto['3. type'],
    region: dto['4. region'],
    marketOpen,
    marketClose,
    timeZone: dto['7. timezone'],
    currency: dto['8. currency'],
    matchScore: parseFloat(dto['9. matchScore']),
  };
};

export default convertStockResponse;
