import { FC, MouseEvent } from 'react';

type BaseButtonProps = {
  text: string;
  buttonClick: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'reset' | 'submit';
};

const BaseButton: FC<BaseButtonProps> = ({ text, buttonClick, type }) => {
  return (
    <button
      type={type || 'button'}
      onClick={buttonClick}
      className="rounded-full border-2 border-black dark:border-white 
      cursor-pointer text-black dark:text-white 
      hover:bg-gray dark:hover:bg-gray p-2 md:p-3"
    >
      {text}
    </button>
  );
};

export default BaseButton;
