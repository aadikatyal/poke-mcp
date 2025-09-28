import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/cedar/components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        pp: {
          bg: '#0A0A0A',
          card: '#1A1A1A',
          border: '#333333',
          accent: '#00D4AA',
          purple: '#8000FF',
          text: '#FFFFFF',
          subt: '#CCCCCC',
        }
      }
    },
  },
  plugins: [],
}
export default config
