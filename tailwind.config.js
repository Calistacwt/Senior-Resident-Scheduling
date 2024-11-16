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
        '3xs': '8px',
        '2xs': '10px'
      },
      colors: { 
        background: { 
          DEFAULT: '#F7F7F7',
          hr: '#707070',
        },
        sidebar: { 
          DEFAULT: '#3C4856',   
          active: '#2371A9',    
          hover:  '#F0FAFF',    
          border: '#A0ACBD'    
        },
        dashboard: { 
          border: '#D8D8D8',
          active: '#F485B8',
          text:  '#5C5C5C',
          room: '#4B8EC8',
          AM:"#EBFCF2",
          PM: "#EDEDFC",
        },
        form: {
          label: '#968C8C',
          text:  '#5C5C5C',
          placeholder: '#797979',
          linehr: '#CBCBCB',
          availSlotColor: '#1483D1',
          availSlotBg: '#D1EDFF',
     

        },
        badge: { 
          am: '#EEFDF3',
          pm: '#EDEDFC',
          sessionText: '#45835B',


        },
        card: {
          line: '#F488BA',
          line2: '#4C8FCB',
          text: '#968C8C',
        },
        component: {
          background: '#D5D5D5',
          modalText: '#888888'
        },
        badge: {
          background: '#BEDAFE',
          text: '#006FFF',
        }
      },
   
    },
  },
  plugins: [],
}

