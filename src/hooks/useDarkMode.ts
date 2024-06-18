import { useEffect } from 'react';

const enableDarkMode = () => {
  document.documentElement.classList.add('dark');
};

const disableDarkMode = () => {
  document.documentElement.classList.remove('dark');
};

const useDarkMode = (enabled: boolean) => {
  useEffect(() => {
    if (enabled) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  }, [enabled]);
};

export default useDarkMode;
