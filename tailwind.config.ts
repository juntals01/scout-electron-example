import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#f8fafc', // soft light blue-gray (tailwind slate-50)
        foreground: '#0f172a', // slate-900

        primary: {
          DEFAULT: '#2563eb', // blue-600
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#eff6ff', // blue-50
          foreground: '#1e3a8a', // blue-900
        },
        destructive: {
          DEFAULT: '#dc2626', // red-600
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#e2e8f0', // slate-200
          foreground: '#475569', // slate-600
        },
        accent: {
          DEFAULT: '#93c5fd', // blue-300
          foreground: '#1e3a8a', // blue-900
        },
        ring: '#2563eb', // match primary
        input: '#e0f2fe', // sky-100
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

export default config;
