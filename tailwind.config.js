module.exports = {
  purge: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
   darkMode: false, // or 'media' or 'class'
   theme: {
    extend: {
      colors: {
        customPink: '#E546E8',
        customPurple: '#4D394D',
        customYellow: '#FEF2A8',
        customDarkPurple: '#5C2C7E',
        customBGCards:'#F2F2F2',
        customSearch:'#EAEAEA'
      },
    },
  },
   variants: {
     extend: {},
   },
   plugins: [],
 }