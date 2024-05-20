/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* App Colors */
        'primary-dark': '#CDFF7B', // Depends on App theme
        'primary-light': '#9bf805', // Depends on App theme
        'primary-variant-dark': '#3700B3', // Depends on App theme
        'primary-variant-light': '#3700B3', // Depends on App theme
        'secondary-dark': '#03DAC6', // Depends on App theme
        'secondary-light': '#03DAC6', // Depends on App theme
        'secondary-variant-dark': '#03DAC6', // Depends on App theme
        'secondary-variant-light': '#018786', // Depends on App theme
        /* Background Colors */
        'background-dark': '#353535',
        'background-light': '#FFFFFF',
        'overlay-background-dark': 'rgba(255,255,255, 0.5)',
        'overlay-background-light': 'rgba(18,18,18, 0.5)',
        'surface-dark': '#212121', // '#121212'
        'surface-light': '#FFFFFF',
        'surface-secondary-dark': '#3D3D3E',
        'surface-secondary-light': '#F1F1F1',
        /* Text Colors */
        'on-dark': '#FCFCFD', // rgba(255,255,255, 0.6)
        textSecondary: '#D7D7D7',
        'on-util-dark': 'rgba(0,0,0, 0.7)', // text color on success, warning, error, etc in dark mode.
        'on-dark-emphasized': '#EAECF0', // rgba(255,255,255, 0.87)
        'on-dark-disabled': 'rgba(255,255,255, 0.38)',
        'on-light': 'rgba(0,0,0, 0.7)',
        'on-util-light': 'rgba(255,255,255, 0.6)', // text color on success, warning, error, etc in light mode.
        'on-light-emphasized': 'rgba(0,0,0, 0.87)',
        'on-light-disabled': 'rgba(0,0,0, 0.38)',
        /* Utility Colors */
        'success-dark': '#179F56',
        'success-light': '#198754',
        'warning-dark': '#F1C232',
        'warning-light': '#FFC107',
        'error-dark': '#CF6679',
        'error-light': '#B00020', // #DC3545
        /* General Colors */
        dark: '#353535',
        light: '#FFFFFF',
        sidenav: '#D7D7D7',
      },
      dropShadow: {
        whiteBottomBorderShadow: [
          '0 1px 1px rgba(255,255,255, 0.25)',
          '2px 2px 1px rgba(255,255,255, 0.15)',
        ],
      },
      boxShadow: {
        card: ' 0px 2px 0px 0px rgba(255, 255, 255, 0.5)',
      },
    },
  },
  plugins: [],
};
