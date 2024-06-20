import { FC } from 'react';

type BaseCard = {
  children: React.ReactNode;
  className?: string;
};

const BaseCard: FC<BaseCard> = ({ children, className }) => {
  return (
    <div
      className={`border border-black dark:border-white backdrop-blur bg-gray/30 dark:bg-white/30 p-4 m-2 rounded-xl shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default BaseCard;
