/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'netflix-red': '#E50914',
        'netflix-red-hover': '#B20710',
        'netflix-black': '#141414',
        'netflix-dark': '#221F1F',
        'netflix-gray': '#564D4D',
      },
    },
  },
  plugins: [],
};
