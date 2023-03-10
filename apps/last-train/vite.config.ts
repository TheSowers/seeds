import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	resolve: {
		alias: {
			$assets: path.resolve('./src/assets'),
			$lib: path.resolve('./src/lib'),
			$components: path.resolve('./src/components')
		}
	},
	plugins: [sveltekit()]
});
