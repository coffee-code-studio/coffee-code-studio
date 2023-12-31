<script lang="ts">
	import { smoothScroll } from '../utils/smoothScroll'
	import { isMenuOpenStore } from './stores'
	import mainLogo from '$lib/assets/coffee-code-studio-logo.png'
	import Background from '$lib/'

	let isMenuOpen: boolean = false

	function toggleMenu(): void {
		isMenuOpen = !isMenuOpen
		isMenuOpenStore.set(isMenuOpen)
		if (isMenuOpen) {
			document.body.classList.add('overflow-hidden')
		} else {
			document.body.classList.remove('overflow-hidden')
		}
	}

	function hideMenu(): void {
		isMenuOpen = false
		isMenuOpenStore.set(isMenuOpen)
		document.body.classList.remove('overflow-hidden')
	}

	/*
	let isMenuOpen: boolean = false

	function toggleMenu(): void {
		isMenuOpen = !isMenuOpen
	}

	function hideMenu(): void {
		isMenuOpen = false
	}
	*/
</script>




<header aria-label="Site Header" class="sticky top-0 bg-white dark:bg-gray-900">
	<div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex-1 md:flex md:items-center md:gap-12">
				<a class="block text-teal-600 dark:text-teal-300" href="/">
					<span class="sr-only">Home</span>
					<img
						class="pointer-events-none"
						src={mainLogo}
						alt="Coffee Code Studio"
						width={64}
						height={64}
					/>
				</a>
			</div>
			<div class="md:flex md:items-center md:gap-12">
				<nav aria-label="Site Nav" class="hidden md:block">
					<ul class="flex items-center gap-6 text-sm">
						<li>
							<a 
								class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75" 
								href="#home" 
								use:smoothScroll
								on:click={hideMenu}>
								Home
							</a>
						</li>
						<li>
							<a 
								class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75" 
								href="#about" 
								use:smoothScroll
								on:click={hideMenu}>
								About
							</a>
						</li>
						<li>
							<a
								class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
								href="#services"
								use:smoothScroll
								on:click={hideMenu}>Services</a
							>
						</li>
						<!---
						<li>
							<a
								class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
								href="#blog"
								use:smoothScroll
								on:click={hideMenu}>Blog</a
							>
						</li>
						--->
						<li>
							<a
								class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
								href="#contact"
								use:smoothScroll
								on:click={hideMenu}>Contact</a
							>
						</li>
					</ul>
				</nav>
				<div>
					<div class="block md:hidden">
						<button
							on:click={toggleMenu}
							class="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
							aria-label="Toggle mobile navigation"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
		{#if isMenuOpen}
			<div class="fixed top-0 left-0 w-screen h-screen bg-white dark:bg-gray-800 z-50">
				<div class="flex flex-col items-center justify-center h-full">
					<img
						class="pointer-events-none absolute top-4 left-4"
						src={mainLogo}
						alt="Coffee Code Studio"
						width={64}
						height={64}
					/>
					<ul class="flex flex-col items-center gap-6 text-xl">
						<li>
							<a
								class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
								href="#home"
								on:click={hideMenu}>Home</a
							>
						</li>
						<li>
							<a
								class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
								href="#about"
								on:click={hideMenu}>About</a
							>
						</li>
						<li>
							<a
								class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
								href="#services"
								on:click={hideMenu}>Services</a
							>
						</li>
						<!---
						<li>
							<a
								class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
								href="#blog"
								on:click={hideMenu}>Blog</a
							>
						</li>
						--->
						<li>
							<a
								class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
								href="#contact"
								on:click={hideMenu}>Contact</a
							>
						</li>
					</ul>
				</div>
			</div>
		{/if}
	</div>
</header>