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
			height: {
				'layout-dynamic': 'calc(100vh_-_7rem)'
			}
		},
	},
	plugins: []
}
