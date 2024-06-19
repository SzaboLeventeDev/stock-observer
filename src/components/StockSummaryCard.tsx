import { Stock } from '@/types/stock';
import { FC } from 'react';
import GlobeIcon from '@/icons/Globe';
import BankNotesIcon from '@/icons/BankNotes';
import FireIcon from '@/icons/Fire';
import TagIcon from '@/icons/Tag';

type StockSummaryCard = {
  stock: Stock;
  index: number;
  animate: boolean;
};

const StockSummaryCard: FC<StockSummaryCard> = ({ stock, index, animate }) => {
  return (
    <div
      className={`border border-black dark:border-white backdrop-blur bg-gray/30 dark:bg-white/30 p-4 m-2 rounded-xl shadow-lg 
    transition-transform duration-500 delay-${index * 300} transform ${animate ? 'translate-y-0' : 'translate-y-20'}`}
    >
      <section>
        <div>
          <h2 className="text-m text-black dark:text-white font-bold">
            {stock.name}
          </h2>
        </div>
        <span className="text-s text-gray/1.1 dark:text-white">
          {stock.symbol}
        </span>
      </section>
      <div className="flex items-center">
        <TagIcon />
        <span className="ml-2 text-s text-black dark:text-white">
          {stock.type}
        </span>
      </div>
      <div className="flex">
        <GlobeIcon />
        <span className="ml-2 text-s text-black dark:text-white">
          {stock.region}
        </span>
      </div>
      <div className="flex">
        <BankNotesIcon />
        <span className="ml-2 text-s text-black dark:text-white">
          {stock.currency}
        </span>
      </div>
      <div className="flex">
        <FireIcon />
        <span className="ml-2 text-s text-black dark:text-white">
          {stock.matchScore.toFixed(4)}
        </span>
      </div>
    </div>
  );
};

export default StockSummaryCard;
