/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#121212',
        surface: '#1e1e1e',
        surfaceHighlight: '#2a2a2a',
        primary: '#10b981', // Emerald green
        secondary: '#3b82f6', // Blue
        accent: '#8b5cf6', // Purple
        danger: '#ef4444', // Red
        warning: '#f59e0b', // Amber
        textPrimary: '#f9fafb', // Gray 50
        textSecondary: '#9ca3af', // Gray 400
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
