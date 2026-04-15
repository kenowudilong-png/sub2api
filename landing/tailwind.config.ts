import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff6ed',
          100: '#ffe7d0',
          200: '#ffcba5',
          300: '#ff9a63',
          400: '#fb6f2b',
          500: '#e84d1a',
          600: '#c4400f',
          700: '#96310d',
          800: '#66220b',
          900: '#321008'
        },
        ink: {
          950: '#06070b',
          900: '#0b1020',
          850: '#111729',
          800: '#171f33',
          700: '#24304a',
          600: '#334560',
          500: '#65748f',
          400: '#8b9ab5',
          300: '#b4c0d5',
          200: '#d3dbeb',
          100: '#f1f4fb'
        },
        ember: {
          500: '#ffb36b',
          400: '#ffd08f'
        }
      },
      fontFamily: {
        display: ['Songti SC', 'STSong', 'Noto Serif SC', 'serif'],
        sans: ['PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans SC', 'sans-serif'],
        mono: ['SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'monospace']
      },
      boxShadow: {
        ember: '0 24px 60px rgba(232, 77, 26, 0.24)',
        panel: '0 18px 60px rgba(5, 8, 18, 0.55)',
        float: '0 30px 80px rgba(5, 8, 18, 0.45)'
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at 50% 0%, rgba(232,77,26,0.24), rgba(232,77,26,0.04) 40%, transparent 68%)',
        'grid-fine':
          'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)'
      },
      animation: {
        drift: 'drift 14s ease-in-out infinite alternate',
        pulseSoft: 'pulseSoft 4.2s ease-in-out infinite'
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '100%': { transform: 'translate3d(0, 12px, 0) scale(1.04)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.58' },
          '50%': { opacity: '0.96' }
        }
      }
    }
  },
  plugins: []
} satisfies Config
