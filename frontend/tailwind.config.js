/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#10b981',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Space Grotesk', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'Space Grotesk', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      animation: {
        'blob': 'blob 7s infinite',
        'fade-in': 'fade-in 0.6s ease-out',
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
        'shake': 'shake 0.5s',
      },
    },
  },
  plugins: [],
}
