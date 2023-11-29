<script>
  import altMainLogo from '$lib/assets/ccs-alt-logo.png'
  import schoodicLogo from '$lib/assets/new-schoodic-logo-bluewhite.svg'

  import svelteLogo from '$lib/assets/svelte-logo.png'
  import denoLogo from '$lib/assets/deno-logo.png'
  import rustLogo from '$lib/assets/rust-logo.png'
  import wasmLogo from '$lib/assets/wasm-logo.png'
</script>

<svelte:head>
    <title>About Coffee Code Studio | Your premier destination for affordable high quality websites | Based in Columbus, Ohio</title>
    <meta name="description" content="Coffee Code Studio">
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="Coffee Code Studio" />
    <meta property="og:title" content="About Coffee Code Studio | Central Ohio Web Design" />
    <meta property="og:description" content="At Coffee Code Studio, our mission is to deliver high quality, afforable, cutting edge web apps, for your business." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://coffeecodestudio.com/about" />
    <meta property="og:image" content="https://coffeecodestudio.com/coffee-code-studio-logo.png" />
    <meta property="article:publisher" content="https://www.facebook.com/CoffeeCodeStudio" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@coffeecodestudio" />
    <!---<link rel="alternate" type="application/rss+xml" title="Ohio Web Design" hreflang="en" href="https://coffeecodestudio.com/" />--->

    <script type="application/ld+json">
        {
            "@content": "http://schema.org",
            "@type": "WebPage",
            "@id": "https://www.coffeecodestudio.com/about",
            "name": "Columbus Ohio Web Design | Coffee Code Studio",
            "url": "https://www.coffeecodestudio.com/about",
            "image": "https://coffeecodestudio.com/coffee-code-studio-logo.png"
        }
    </script>
</svelte:head>

<section class="bg-white dark:bg-gray-900 mt-20 mb-20">
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div class="max-w-3xl">
        <h1 class="text-3xl font-bold sm:text-5xl dark:text-white">
          Crafting Digital Experiences
        </h1>
      </div>
  
      <div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        <div class="relative h-64 overflow-hidden sm:h-80 lg:h-full">
          <img
            alt="Party"
            src={altMainLogo}
            class="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
        </div>
  
        <div class="lg:py-16">
          <article class="space-y-4 text-gray-600 dark:text-white">
            <h2 class="text-lg">
              Welcome to Coffee Code Studio, your premier destination for exceptional web development services. 
              Based in the heart of Central Ohio, we specialize in building captivating websites that empower businesses 
              to thrive in the digital realm. With a team of skilled professionals, we are committed to delivering the 
              best possible web solutions that align with your unique goals and aspirations. 
              Whether you're a local business in Ohio or located anywhere else in the world, our expertise extends to remote work, 
              ensuring that distance is never a barrier to achieving excellence.
              At Coffee Code Studio, we pour our passion for coding and design into every project, 
              crafting digital experiences that leave a lasting impact.
            </h2>
          </article>
        </div>
      </div>
    </div>
</section>

<section class="bg-white dark:bg-gray-900 mt-40 mb-40">
  <div class="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
    <header>
      <h2 class="text-xl font-bold dark:text-white text-gray-600 sm:text-4xl">
        Technologies We Use
      </h2>
    </header>

    <ul class="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
      <li>
        <a href="https://kit.svelte.dev/" class="block">
          <img
            alt="Art"
            src={svelteLogo}
            class="h-64 w-full object-cover sm:h-80 lg:h-96"
          />
        </a>
      </li>

      <li>
        <a href="https://deno.land/" class="block">
          <img
            alt="Art"
            src={denoLogo}
            class="h-64 w-full object-cover sm:h-80 lg:h-96"
          />
        </a>
      </li>

      <li>
        <a href="https://www.rust-lang.org/" class="block">
          <img
            alt="Art"
            src={rustLogo}
            class="h-64 w-full object-cover sm:h-80 lg:h-96"
          />
        </a>
      </li>

      <li>
        <a href="https://webassembly.org/" class="block">
          <img
            alt="Art"
            src={wasmLogo}
            class="h-64 w-full object-cover sm:h-80 lg:h-96"
          />
        </a>
      </li>
    </ul>
  </div>
</section>

<section class="bg-white dark:bg-gray-900 mb-40 mt-40">
  <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 class="mb-4 text-5xl  font-semibold text-center text-gray-900 dark:text-white">Collaborations</h2>
      <a href="https://schoodic.io/" class="block">
        <img
          alt="Art"
          src={schoodicLogo}
          class="h-64 w-full sm:h-80 lg:h-96"
        />
      </a>
  </div>
</section>