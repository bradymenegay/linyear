import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'landscapeCal': 'repeat(32, minmax(0, 1fr))',
        'portraitCal': 'repeat(12, minmax(0, 1fr))'
      }
    }
  },
  plugins: [],
} satisfies Config;
