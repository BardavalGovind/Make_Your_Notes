/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ensure Tailwind processes all relevant files
  ],
  theme: {
    extend: {
      height: {
        heightWithoutNavbar: 'calc(100vh - 80px)', // Custom height calculation
      },
      backgroundImage: {
        unsplashBgImage: "url('/img/bgImg.jpg')", // Custom background image
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))', // Radial gradient
      },
    },
  },
  plugins: [],
};
