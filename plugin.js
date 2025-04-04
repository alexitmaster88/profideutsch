const plugin = require("tailwindcss/plugin");

module.exports = plugin(
  function ({ addBase, theme }) {
  },
  {
    theme: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1.25rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '4rem',
          '2xl': '5rem',
        },
      },
      screens: {
        sm: '30rem',
        md: '48rem',
        lg: '61rem',
        xl: '90rem',
      },
      extend: {
        boxShadow: {
          'xs': ' 0px 25px 70px 0px rgba(10, 3, 60, 0.15)',
          'sm': '0px 8px 16px 0px rgba(0, 0, 0, 0.05)',
          'md': '0px 50px 50px 0px rgba(0, 0, 0, 0.10)',
          'lg': '2px 3px 30px rgba(0, 0, 0, 0.1)'
        },
        dropShadow: {
          'xs': ' 0px 25px 70px 0px rgba(10, 3, 60, 0.15)',
          'sm': '0px 8px 16px 0px rgba(0, 0, 0, 0.05)',
          'md': '0px 50px 50px 0px rgba(0, 0, 0, 0.10)',
          'lg': '2px 3px 30px rgba(0, 0, 0, 0.1)'
        },
        colors: {
          transparent: 'transparent',
          current: 'currentColor',
          'primary': {
            'DEFAULT': '#0b2f82',
            '50': '#ecf7ff',
            '100': '#d6ebff',
            '200': '#b5ddff',
            '300': '#82c9ff',
            '400': '#48aaff',
            '500': '#1e85ff',
            '600': '#0662ff',
            '700': '#004bf5',
            '800': '#073cc6',
            '900': '#0b2f82',
            '950': '#0d245e',
          },

        },
      },
    },
    plugins: [
      require('@tailwindcss/nesting')
    ],
  },
);
