module.exports = {
  content: ['app/**/*.tsx', 'src/components/**/*.tsx', '../ui/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        linework: '#e2e2e2',
        accent: '#e7131a',
        editor: '#fbfbfb',
      },
      fontFamily: {
        serif: ['Source Serif 4', 'serif'],
      },
    },
  },
  plugins: [],
};
