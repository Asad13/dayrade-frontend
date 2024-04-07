export default {
  plugins: {
    stylelint: {},
    'postcss-import': {}, // plugins: ['stylelint']
    'postcss-extend': {},
    'postcss-mixins': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    'postcss-preset-env': {
      features: { 'nesting-rules': false },
    },
    'postcss-reporter': { clearReportedMessages: true },
  },
}
