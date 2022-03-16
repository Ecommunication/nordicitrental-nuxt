// tailwind.config.js
module.exports = {
  purge: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `plugins/**/*.{js,ts}`,
    `nuxt.config.{js,ts}`,
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        mainBlue: '#092d4f',
        grayLight: '#f6f6f6',
        textMain: '#585858',
      },
    },
  },
  variants: {
    extend: {
      translate: ['group-hover'],
    },
  },
  plugins: [],
};
