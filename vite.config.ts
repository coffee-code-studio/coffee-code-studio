import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'
import path from 'path'

const config: UserConfig = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	build: {
		/*
		rollupOptions: {
			external: [
				'@tsparticles/svelte',
				'@tsparticles/slim'
			]
		},
		*/
		sourcemap: false,
	},
	resolve: {
		alias: {
			'@tsparticles/slim': path.resolve(__dirname, 'node_modules/@tsparticles/slim'),
		}
	},
	ssr: {
		noExternal: ["tsparticles", "@tsparticles/slim", "@tsparticles/engine", "@tsparticles/svelte"],
	},
	server: {
		proxy: {
			'/invoice': 'http://127.0.0.1:8000'
		}
	}
}

export default config
