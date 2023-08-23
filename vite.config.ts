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
		noExternal: ["tsparticles", "tsparticles-slim", "tsparticles-engine", "svelte-particles"],
	}
}

export default config
