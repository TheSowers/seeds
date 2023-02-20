/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		colors: {
			train: {
				1: '#0052A4',
				2: '#00A84D',
				3: '#EF7C1C',
				4: '#00A5DE',
				5: '#996CAC',
				6: '#CD7C2F',
				7: '#747F00',
				8: '#E6186C',
				9: '#BB8336'
			}
		},
		extend: []
	},
	darkMode: 'class',
	plugins: [require('flowbite/plugin')]
};
