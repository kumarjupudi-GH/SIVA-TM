/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 950: '#050B1E', 900: '#0A1128', 800: '#101B3D', 700: '#17254F' },
        brand: { DEFAULT: '#2563EB', light: '#60A5FA' },
        cyan: { accent: '#22D3EE' },
        gold: { DEFAULT: '#C9A24B', light: '#E3C47A' },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(34, 211, 238, 0.35)',
      },
    },
  },
  plugins: [],
};
