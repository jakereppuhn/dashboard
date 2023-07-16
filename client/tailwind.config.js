/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				'primary-light': '#0F62FE',
				'secondary-light': '#FFC107',
				'bg-light': '#FBFBFB',
				'accent-light': '#F1F1F1',
				'primary-dark': '#212121',
				'secondary-dark': '#FFA000',
			},
		},
	},
	plugins: [],
};
