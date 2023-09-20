const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Chivo', ...defaultTheme.fontFamily.sans]
			},
			colors: {
				'dark-red': '#980404',
				'crimson-red': '#491921'
			},
			width: {
				'nav-logo': '2.756rem'
			},
			height: {
				'nav-logo': '7.275rem'
			},
			minHeight: {
				'landing-panel': 'calc(100vh - 9.025rem)'
			}
		},
	},
	plugins: [
		require('@tailwindcss/forms')
	]
}
