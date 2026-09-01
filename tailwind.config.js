/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',      // Deep Professional Blue
        secondary: '#0891B2',    // Sophisticated Cyan
        accent: '#DC2626',       // Premium Red
        danger: '#EF4444',
        gold: '#D97706',         // Elegant Gold
        dark: '#0F172A',         // Deep Navy
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}
