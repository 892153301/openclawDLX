/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0f0f1a',
          card: '#1a1a2e',
          border: '#2a2a4e',
        },
        accent: {
          cyan: '#00d4ff',
          purple: '#6c46c1',
          green: '#00c48c',
          orange: '#ff9500',
          red: '#ff4757',
        },
        text: {
          primary: '#ffffff',
          secondary: '#8b8ba7',
        },
      },
      fontFamily: {
        mono: ['"SF Mono"', '"JetBrains Mono"', 'monospace'],
        chinese: ['"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
