/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enable class-based dark mode (toggled via JS theme script in <head>)
  darkMode: 'class',

  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx}'
  ],

  theme: {
    extend: {
      // Brand color palette
      colors: {
        brand: {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49'
        },
        // Primary action color — vibrant teal-green
        primary: {
          50:  '#f0fdf9',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a'
        },
        // Dark navy for backgrounds
        navy: {
          800: '#0f2040',
          900: '#0a1628',
          950: '#060d1a'
        }
      },

      // Typography scale
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'monospace']
      },

      fontSize: {
        'xs':  ['0.75rem',  { lineHeight: '1.25rem' }],
        'sm':  ['0.875rem', { lineHeight: '1.375rem' }],
        'base':['1rem',     { lineHeight: '1.625rem' }],
        'lg':  ['1.125rem', { lineHeight: '1.75rem'  }],
        'xl':  ['1.25rem',  { lineHeight: '1.875rem' }],
        '2xl': ['1.5rem',   { lineHeight: '2rem'     }],
        '3xl': ['1.875rem', { lineHeight: '2.375rem' }],
        '4xl': ['2.25rem',  { lineHeight: '2.75rem'  }],
        '5xl': ['3rem',     { lineHeight: '1.15'     }]
      },

      maxWidth: {
        'content': '72ch',
        'wide': '90rem'
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem'
      },

      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem'
      },

      boxShadow: {
        'card':  '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        'card-hover': '0 4px 16px -2px rgb(0 0 0 / 0.12), 0 2px 8px -2px rgb(0 0 0 / 0.08)',
        'panel': '0 0 0 1px rgb(0 0 0 / 0.05), 0 4px 24px -4px rgb(0 0 0 / 0.1)',
        'result':'0 0 0 1px rgb(14 165 233 / 0.2), 0 8px 32px -8px rgb(14 165 233 / 0.2)'
      },

      // Smooth transitions for theme toggle
      transitionProperty: {
        'theme': 'background-color, border-color, color, fill, stroke'
      },

      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in': 'slideIn 0.25s ease-out',
        'pop': 'pop 0.15s ease-out'
      },

      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(-4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideIn: {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        pop: {
          '0%':   { transform: 'scale(0.95)' },
          '70%':  { transform: 'scale(1.03)' },
          '100%': { transform: 'scale(1)' }
        }
      }
    }
  },

  plugins: []
};
