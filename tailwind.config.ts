import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode:["class"],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg) scale(1)', boxShadow: '0 0 0 rgba(0, 0, 0, 0)' },
          '10%': { transform: 'translateX(-5px) rotate(-1deg) scale(1.02)', boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)' },
          '25%': { transform: 'translateX(5px) rotate(1deg) scale(1.02)', boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)' },
          '50%': { transform: 'translateX(-5px) rotate(-1deg) scale(1.02)', boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)' },
          '75%': { transform: 'translateX(5px) rotate(1deg) scale(1.02)', boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)' },
          '90%': { transform: 'translateX(-5px) rotate(-1deg) scale(1.02)', boxShadow: '0 0 10px rgba(255, 0, 0, 0.5)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
      },
      fontFamily:{
        Poppins:['var(--font-poppins)'],
        Josefin:['var(--font-josefin)']
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        "1000px": "1000px",
        "1100px": "1100px",
        "1200px": "1200px",
        "1300px": "1300px",
        "1500px": "1500px",
        "800px": "800px",
        "400px": "400px",

      }
    },
  },
  plugins: [],
}
export default config
