import { sveltekit } from '@sveltejs/kit/vite'
import type { UserConfig } from 'vite'

const config: UserConfig = {
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	build: {
		sourcemap: false,
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
