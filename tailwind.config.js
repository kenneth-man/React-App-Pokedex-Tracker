//custom tailwind values
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Heebo']
      },
      colors: {
        // 'white-transp-30': 'rgba(255, 255, 255, 0.3)',
        // 'white-transp-60': 'rgba(255, 255, 255, 0.6)',
      },
    },
  },
  plugins: [],
  // ,
  // important: true
}
