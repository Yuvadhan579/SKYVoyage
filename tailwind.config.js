/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0B172A',
          900: '#142C52',
          850: '#18365F',
          800: '#1B4074',
          700: '#2455A4',
          600: '#2D68BE',
          500: '#397BCB',
          400: '#6A9BD5',
        },
        aviation: {
          DEFAULT: '#2455A4',
          hover: '#1D478B',
          light: '#5D8FCB',
          dark: '#142C52',
          muted: '#8AAED8',
        },
        sky: {
          brand: '#BBD8F4',
          soft: '#EAF3FC',
        },
        cloud: '#F4F7FB',
        gold: {
          DEFAULT: '#AFC2D8',
          light: '#D9E4EF',
          dark: '#819AB5',
        },
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#142C52',
          950: '#0B172A',
        },
        brown: {
          50: '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0', 300: '#CBD5E1',
          400: '#94A3B8', 500: '#64748B', 600: '#475569', 700: '#334155',
          800: '#1E293B', 900: '#142C52', 950: '#0B172A',
        },
        dusky: {
          50: '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0', 300: '#CBD5E1',
          400: '#94A3B8', 500: '#64748B', 600: '#475569', 700: '#334155',
          800: '#1E293B', 900: '#142C52', 950: '#0B172A',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(20, 44, 82, 0.08), 0 2px 6px -1px rgba(20, 44, 82, 0.04)',
        elevated: '0 12px 36px -4px rgba(20, 44, 82, 0.14), 0 4px 12px -2px rgba(20, 44, 82, 0.06)',
        floating: '0 20px 48px -6px rgba(20, 44, 82, 0.22), 0 8px 16px -4px rgba(20, 44, 82, 0.12)',
      },
    },
  },
  plugins: [],
}
