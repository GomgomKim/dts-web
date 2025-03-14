import type { Config } from 'tailwindcss'

import { colorMap } from './src/app/styles/colors'

const config = {
  darkMode: ['class'],
  // mode: 'jit',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem'
    },
    screens: {
      sm: '768px',
      md: '1280px',
      lg: '1512px',
      xl: '2560px',
      '2xl': '3840px'
      // '2xl': '1536px'
    },
    extend: {
      colors: {
        border: 'var(--border)',
        input: 'hsl(var(--input))',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
          hover: 'var(--primary-hover)'
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)'
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
          hover: 'var(--destructive-hover)'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        ...colorMap,
        gridTemplateColumns: {
          'auto-fill-minmax': 'repeat(auto-fill, minmax(288px, 1fr))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'sidebar-fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        'sidebar-fadeIn': 'sidebar-fadeIn 0.2s ease-in-out',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      backgroundImage: {
        'custom-gradient':
          'linear-gradient(180deg, rgba(15, 16, 17, 0.00) 29.5%, rgba(15, 16, 17, 0.40) 60.47%, rgba(15, 16, 17, 0.80) 91.38%)',
        'custom-180-gradient':
          'linear-gradient(180deg, #202124 0%, rgba(32, 33, 36, 0.00) 100%)'
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)']
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
} satisfies Config

export default config
