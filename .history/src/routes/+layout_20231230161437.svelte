<script lang="ts">
    import '../app.css'
    import { onMount } from 'svelte'
    import type { PageData } from './$types'
    import { dataStore } from '$lib/stores'
    import Particles from '$lib/Particles.svelte'
    import Navbar from '$lib/Navbar.svelte'
    import Footer from '$lib/Footer.svelte'

    let ipAddress

    console.log(
        `%cCoffee Code Studio`,
        `
        font-size: 50px;
        color: #111827;
        background:linear-gradient(#86efac, #3b82f6, #9333ea);
        border-radius: 15px;
        padding: 1rem;
        `
    )
</script>

<style>
    @media (prefers-color-scheme: dark) {
        :global(body) {
            background-color: #111827;
        }
    }

    @media (prefers-color-scheme: light) {

        :global(body) {

            background-color: #ffffff;
        }
    }

    :global(body) {
        scroll-behavior: smooth;
    }

    
</style>

<Particles />

<Navbar />

<div class="container justify-center items-center max-w-full">
    <slot />
    <Footer />
</div>