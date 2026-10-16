/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#285943', // Forest Green
          dark: '#173D2B',    // Deep Forest
          light: '#377357',
        },
        sage: {
          DEFAULT: '#7FA58A', // Sage
          light: '#EBF2ED',
          dark: '#5D8068',
        },
        cream: {
          DEFAULT: '#F7F5EF', // Warm Cream background
          surface: '#FDFBF7',
        },
        surface: '#FFFFFF',   // White surface
        charcoal: {
          DEFAULT: '#1F2933', // Primary Text
          muted: '#3E4C59',
        },
        slate: {
          DEFAULT: '#667085', // Secondary Text
          muted: '#98A2B3',
        },
        status: {
          success: '#2E7D5B', // Success Green
          warning: '#C88719', // Urgency Amber
          critical: '#B54747', // Muted Red
        },
        border: {
          subtle: '#E5E7EB',  // Subtle border
          strong: '#D1D5DB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      spacing: {
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'full': '9999px',
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(31, 41, 51, 0.05)',
        'card': '0 2px 4px rgba(31, 41, 51, 0.04), 0 1px 2px rgba(31, 41, 51, 0.02)',
        'modal': '0 10px 25px -5px rgba(23, 61, 43, 0.1), 0 8px 10px -6px rgba(23, 61, 43, 0.05)',
      }
    },
  },
  plugins: [],
}
