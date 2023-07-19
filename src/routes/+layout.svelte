<script lang="ts">
    import '../app.css'
    import type { PageData } from './$types'
    import { dataStore } from '$lib/stores'
    import Particles from '$lib/Particles.svelte'
    import Navbar from '$lib/Navbar.svelte'
    import Footer from '$lib/Footer.svelte'
    // import LiveChat from '$lib/LiveChat.svelte'
    
    /*
    export let data: PageData
    
    $: {
        $dataStore = {
            ...data,
            title: dataStore || data.title,
            description: data?.description || data.description
        }
    }
    */
   
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

<svelte:head>
    <title>Coffee Code Studio</title>
    <meta name="description" content="Coffee Code Studio">
    <meta property="og:site_name" content="Coffee Code Studio" />
    <meta property="og:title" content="Coffee Code Studio - Web Design and Development" />
    <meta property="og:description" content="At Coffee Code Studio, our mission is to deliver high quality, afforable, cutting edge web apps, for your business." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://coffeecodestudio.com" />
    <meta property="og:image" content="https://coffeecodestudio.com/src/lib/assets/coffee-code-studio-logo.png" />

    <script type="application/ld+json">
        {
            "@content": "http://schema.org",
            "@type": "Website",
            "name": "Coffee Code Studio",
            "url": "https://www.coffeecodestudio.com",
        }
    </script>
</svelte:head>

<!---
<svelte:head>
    <title>{data.title}</title>
    <meta name="description" content={data.description}>
</svelte:head>
--->


<style>
    :global(body) {
        background-color: #111827;
    }
</style>

<Particles />

<Navbar />

<div class="container justify-center items-center max-w-full">
    <slot />

    <Footer />
</div>