import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F3F1EA',
        ink: '#20242C',
        navy: {
          DEFAULT: '#1B2A4A',
          50: '#EEF1F6',
          100: '#D6DCE9',
          300: '#8393B4',
          500: '#3C5079',
          700: '#1B2A4A',
          900: '#101A30'
        },
        saffron: {
          DEFAULT: '#E8871E',
          100: '#FCE9D2',
          300: '#F2B366',
          500: '#E8871E',
          700: '#B4640E'
        },
        teal: {
          DEFAULT: '#1F6F78',
          100: '#DCEEEF',
          500: '#1F6F78'
        },
        moss: {
          DEFAULT: '#3F7D5C',
          100: '#DFEEE5'
        },
        brick: {
          DEFAULT: '#A63A32',
          100: '#F4DEDC'
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '3px',
        md: '4px'
      },
      boxShadow: {
        card: '0 1px 0 rgba(27,42,74,0.08)',
        panel: '0 2px 12px rgba(16,26,48,0.08)'
      }
    }
  },
  plugins: []
};

export default config;
