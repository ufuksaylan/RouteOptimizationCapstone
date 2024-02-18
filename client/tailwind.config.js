import flowbitePlugin from 'flowbite/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',

    // .. for monorepo
    '../node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
    '../node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [flowbitePlugin],
  theme: {
    colors: {
      'navBar-bg': '#313e40',
      'bg-light': '#53676d',
      'bg-lighter': '#61787f',
      button: '#ebf4ff',
      'button-text': '#4e6a8a',
      'navBar-hover': '#b1b1b1',
      'title-color': '#4a4847',
      'input-bg': '#f5f5f5',
      'text-light': '#b5c4c9',
    },
    fontFamily: {
      body: ['"Inter var"', '"Inter"', '"Open Sans"', 'Helvetica', 'Arial', 'sans-serif'],
      mono: ['"Fira Code"', 'monospace'],
    },
  },
}
