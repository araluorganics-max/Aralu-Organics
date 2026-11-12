/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#1F3D2B',
          900: '#162D20',
          700: '#2C5239',
        },
        cream: {
          DEFAULT: '#F4EFE3',
          50: '#FBF9F4',
          200: '#E8E0CC',
        },
        amber: {
          DEFAULT: '#C8861D',
          light: '#E3AE55',
          dark: '#8A5A0B',
          100: '#F6E7CB',
        },
        ink: {
          DEFAULT: '#1B241E',
          muted: '#4B5A4F',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        kannada: ['"Noto Sans Kannada"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
