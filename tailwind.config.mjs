/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				// Colores Oficiales Manual DATACAR
				primary: '#0A1F33',   // Authority Blue (Fondo, Seriedad)
				secondary: '#3A3A3C', // Data Charcoal (Textos)
				accent: '#00BFFF',    // Digital Cyan (Botones/Acción)
			},
			fontFamily: {
				// Tipografías Oficiales
				sans: ['Inter', 'sans-serif'],    // Lectura
				heading: ['Archivo', 'sans-serif'], // Impacto
			},
		},
	},
	plugins: [],
}