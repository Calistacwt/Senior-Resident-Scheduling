/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        xxs: '320px',
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      fontSize: {
        'xxs': '10px',
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
      },
      colors: { 
        background: { 
          DEFAULT: '#F7F7F7'
        },
        sidebar: { 
          DEFAULT: '#3C4856',   // text 
          active: '#2371A9',  
          hover:  '#F0FAFF',
          border: '#A0ACBD'
        },
        dashboard: { 
          border: '#D8D8D8',
          active: '#F485B8',
          text:  '#5C5C5C',
        },
      },
   
    },
  },
  plugins: [],
}

