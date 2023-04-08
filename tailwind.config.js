/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        primary: "#E87121",
        secondary: "#375768",
        lightgreen: "#bbe3a6",
        light: "#E3EBF1"
      },
      spacing: {
        28: '7rem',
        content: '1140px',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        'extra-tight': '1.15',
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      fontFamily: {
        primary: ['var(--font-poppins)'],
        secondary: ['var(--font-poppins)'],
    },
    },
  },
  plugins: [],
}
