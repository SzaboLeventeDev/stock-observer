import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        '25p': '25%',
        '50p': '50%',
      },
    },
    colors: {
      'midnight-blue': '#15292b',
      white: '#ffffff',
      black: '#000000',
      gray: '#6e7a88',
      green: '#8cffa0',
      'green-deep': '#4caf50',
      red: '#ff5f6e',
    },
  },
  plugins: [],
};
export default config;
