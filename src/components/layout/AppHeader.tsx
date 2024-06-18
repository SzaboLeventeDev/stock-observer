'use client';

import useDarkMode from '@/hooks/useDarkMode';
import { FC, useState } from 'react';
import SunIcon from '@/icons/Sun';
import MoonIcon from '@/icons/Moon';

const AppHeader: FC = () => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  useDarkMode(darkModeEnabled);

  return (
    <nav className="p-4 bg-gray-100 backdrop-blur flex justify-between items-center">
      <span className="text-xl font-bold text-black dark:text-white">
        Stock observer
      </span>
      <button
        onClick={() => setDarkModeEnabled(!darkModeEnabled)}
        className="w-10 text-black dark:text-white bg-gray-300 dark:bg-gray-800 rounded"
      >
        {darkModeEnabled ? <MoonIcon /> : <SunIcon />}
      </button>
    </nav>
  );
};

export default AppHeader;
