<script lang="ts">
    import '../app.css'
    import { onMount } from 'svelte'
    import type { PageData } from './$types'
    import { dataStore } from '$lib/stores'
    import Particles from '$lib/Particles.svelte'
    import Navbar from '$lib/Navbar.svelte'
    import Footer from '$lib/Footer.svelte'

    let ipAddress

    /*
    let test = onMount(async () => {
        const res = await fetch('/ip-address')
        ipAddress = await res.json()
    })

    $: {
        console.log(test)
    }

    async function fetchIp() {
        const res = await fetch('/ipAddress')
        ipAddress = await res.json()
    }

    */

    // const logIp = fetchIp()
    // console.log(logIp)
   
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
<!---
<svelte:head>
    <title>Coffee Code Studio</title>
    <meta name="description" content="Coffee Code Studio">
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="Coffee Code Studio" />
    <meta property="og:title" content="Coffee Code Studio - Columbus Ohio Web Design" />
    <meta property="og:description" content="At Coffee Code Studio, our mission is to deliver high quality, afforable, cutting edge web apps, for your business." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://coffeecodestudio.com/" />
    <meta property="og:image" content="https://coffeecodestudio.com/coffee-code-studio-logo.png" />
    <meta property="article:publisher" content="https://www.facebook.com/CoffeeCodeStudio" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@coffeecodestudio" />

    <script type="application/ld+json">
        {
            "@content": "http://schema.org",
            "@type": "WebPage",
            "@id": "https://www.coffeecodestudio.com/"
            "name": "Columbus Ohio Web Design | Coffee Code Studio",
            "url": "https://www.coffeecodestudio.com/",
            "image": "https://coffeecodestudio.com/coffee-code-studio-logo.png"
        }
    </script>
</svelte:head>
--->

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