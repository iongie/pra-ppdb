/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
      },
      keyframes: {
        'slide-in-right': {
          from: {
            transform: 'translateX(100%)',
          },
          to: {
            transform: 'translateX(0)',
          },
        },
        'slide-out-right': {
          from: {
            transform: 'translateX(0)',
          },
          to: {
            transform: 'translateX(100%)',
          },
        },
      },
      animation: {
        'slide-in': 'slide-in-right 4s linear',
        'slide-out': 'slide-out-right 4s linear',
      },
      colors: {
        colors: {
          'primary': "#2F324C",
          'secondary': "#FFD371",
          'thirty':  "#FFDDBF",
          'fourty': '#E0B963'
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin') // add this line
  ],
}

