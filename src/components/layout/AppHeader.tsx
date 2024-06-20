'use client';

import useDarkMode from '@/hooks/useDarkMode';
import { FC, useState } from 'react';
import SunIcon from '@/icons/Sun';
import MoonIcon from '@/icons/Moon';

const AppHeader: FC = () => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  useDarkMode(darkModeEnabled);

  return (
    <nav className="p-4 fixed top-0 w-full backdrop-blur flex justify-between items-center z-10">
      <span className="text-xl font-bold text-black dark:text-white">
        Stock observer
      </span>
      <button
        onClick={() => setDarkModeEnabled(!darkModeEnabled)}
        className="w-10 text-black dark:text-white rounded transition-colors duration-500"
      >
        {darkModeEnabled ? <MoonIcon /> : <SunIcon />}
      </button>
    </nav>
  );
};

export default AppHeader;
