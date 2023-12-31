<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { isMenuOpenStore } from '$lib/stores'
  import lightDownArrow from '$lib/assets/light-down-arrow.png'
  import darkDownArrow from '$lib/assets/dark-down-arrow.png'
  import codeImage from '$lib/assets/code.png'
  import image3D from '../3d.module.css'

  let prefersDarkTheme: any
  let mediaQuery: any

  onMount(() => {
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    prefersDarkTheme = mediaQuery.matches
    
    const changeHandler = (e: any) => {
      prefersDarkTheme = e.matches
    }

    mediaQuery.addEventListener('change', changeHandler)

    onDestroy(() => {
      mediaQuery.removeEventListener('change', changeHandler)
    })
  })
</script>

<svelte:head>
    <title>Coffee Code Studio | Your premier destination for affordable high quality websites | Based in Columbus, Ohio</title>
    <meta name="description" content="Coffee Code Studio">
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="Coffee Code Studio" />
    <meta property="og:title" content="Coffee Code Studio | Central Ohio Web Design" />
    <meta property="og:description" content="At Coffee Code Studio, our mission is to deliver high quality, afforable, cutting edge web apps, for your business." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://coffeecodestudio.com/" />
    <meta property="og:image" content="https://coffeecodestudio.com/coffee-code-studio-logo.png" />
    <meta property="article:publisher" content="https://www.facebook.com/CoffeeCodeStudio" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@coffeecodestudio" />
    <!---<link rel="alternate" type="application/rss+xml" title="Ohio Web Design" hreflang="en" href="https://coffeecodestudio.com/" />--->

    <script type="application/ld+json">
        {
            "@content": "http://schema.org",
            "@type": "WebPage",
            "@id": "https://www.coffeecodestudio.com/",
            "name": "Columbus Ohio Web Design | Coffee Code Studio",
            "url": "https://www.coffeecodestudio.com/",
            "image": "https://coffeecodestudio.com/coffee-code-studio-logo.png"
        }
    </script>
</svelte:head>

<!------------------------- Header ------------------------------>
<section id="home" class="bg-white dark:bg-gray-900 text-white">
	<div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
		<div class="mx-auto max-w-3xl text-center">
			<h1 class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-6xl font-extrabold text-transparent sm:text-5x1">
        Coffee Code Studio
      </h1>
			<p class="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed text-gray-900 dark:text-white">
        At Coffee Code Studio, our mission is to deliver high quality, afforable, cutting edge web apps, for your business.
      </p>
			<div class="mt-8 flex flex-wrap justify-center gap-4">
				<a class="block w-full rounded border border-blue-600 px-12 py-3 text-md font-medium text-gray-900 dark:text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto" href="/about">
          Find out more
        </a>
        <a class="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-md font-medium text-white dark:text-white hover:bg-blue-600 focus:outline-none focus:ring active:text-opacity-75 sm:w-auto" href="/contact">
          Contact us
        </a>
			</div>
      {#if !$isMenuOpenStore}
        <div class="{prefersDarkTheme ? 'text-gray-900' : 'text-white'} mt-12">
            {#if prefersDarkTheme}
                <img src={lightDownArrow} alt="Scroll down" class="mx-auto w-40 h-20 animate-bounce sm:w-40 sm:h-12 md:w-40 md:h-16 lg:w-40 lg:h-20 xl:w-40 xl:h-20">
            {:else}
                <img src={darkDownArrow} alt="Scroll down" class="mx-auto w-40 h-20 animate-bounce sm:w-40 sm:h-12 md:w-40 md:h-16 lg:w-40 lg:h-20 xl:w-40 xl:h-20">
            {/if}
        </div>
      {/if}
		</div>
	</div>
</section>

<!--  About Us  -->
<section id="about">
  <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
    <div class="max-w-3xl">
      <h2 class="text-5xl font-bold sm:text-5xl text-gray-800 dark:text-white">
        About Us
      </h2>
    </div>

    <div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      <!---div class="relative h-64 overflow-hidden sm:h-80 lg:h-full">-->
      <div class={`relative h-64 overflow-hidden sm:h-80 lg:h-full ${$isMenuOpenStore ? 'hidden' : ''}`}>
        <img
          alt="Party"
          src={codeImage}
          draggable="false"
          class={`${image3D.box} w-auto h-[110%] object-cover absolute top-[50%] left-[50%] z-[-1] object-cover pointer-events-none`}
        />
        <!---class="absolute inset-0 h-full w-full object-cover pointer-events-none"--->
      </div>

      <div class="lg:py-16">
        <article class="space-y-4 text-lg text-gray-500 dark:text-gray-300">
          <p>
            <bold class="text-blue-500 font-medium">Coffee Code Studio</bold> stands out as Central Ohio's premier 
            destination for top-tier web development and design. Founded 
            by a group of passionate tech enthusiasts in the heart of 
            Columbus, our team excels in turning business dreams into 
            digital realities, both locally and internationally. Our roots 
            in Columbus give us a unique perspective, allowing us to 
            blend global digital trends with a touch of local charm.
          </p>

          <p>
            <bold class="text-blue-500 font-medium">Coffee Code Studio</bold> harnesses the latest in cutting-edge 
            web technologies to create stunning, high-performance digital 
            solutions. We're dedicated to understanding and meeting your 
            needs, accompanying you every step of the way from the initial 
            concept to the launch of your project. Our commitment is to bring 
            your vision to life, precisely as you imagine it, ensuring that 
            every interaction with us adds value to your business journey.
          </p>
        </article>
      </div>
    </div>
  </div>
</section>

<!------------------------- What we offer -------------------------->

<section id="services" class="flex justify-center bg-white dark:bg-gray-900 mt-40">
  <div class="max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="max-w-xl">
      <h2 class="text-5xl font-bold sm:text-5xl text-gray-800 dark:text-white">What we offer</h2>
    </div>
    <div class="mt-8 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
      <div class="flex items-start">
        <span class="flex-shrink-0 rounded-lg bg-gray-800 text-white p-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
          </svg>
        </span>
        <div class="ml-4">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">SEO and Digital Marketing</h2>
          <p class="mt-1 text-lg text-gray-500 dark:text-gray-300">We use a data-driven approach to optimize websites for search engines and implement effective digital marketing strategies that drive traffic and increase conversions. </p>
          <a href="/"><p class="mt-1 text-blue-500 text-lg">Learn more...</p></a>
        </div>
      </div>
      <div class="flex items-start">
        <span class="flex-shrink-0 rounded-lg bg-gray-800 text-white p-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>
        </span>
        <div class="ml-4">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">Web Design and Development</h2>
          <p class="mt-1 text-lg text-gray-500 dark:text-gray-300">We provide customized web design and development solutions tailored to our clients' unique needs and preferences. Our team of skilled professionals combines creativity, innovation, and expertise to deliver exceptional results. </p>
          <a href="/"><p class="mt-1 text-blue-500 text-lg">Learn more...</p></a>
        </div>
      </div>
      <div class="flex items-start">
        <span class="flex-shrink-0 rounded-lg bg-gray-800 text-white p-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
          </svg>
        </span>
        <div class="ml-4">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">Mobile Apps</h2>
          <p class="mt-1 text-lg text-gray-500 dark:text-gray-300">We develop mobile apps using the latest technologies and frameworks to deliver high-quality, user-friendly applications that meet our clients' specific requirements. </p>
          <a href="/"><p class="mt-1 text-blue-500 text-lg">Learn more...</p></a>
        </div>
      </div>
      <div class="flex items-start">
        <span class="flex-shrink-0 rounded-lg bg-gray-800 text-white p-4">
          <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
          </svg>
        </span>
        <div class="ml-4">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">Free Hosting</h2>
          <p class="mt-1 text-lg text-gray-500 dark:text-gray-300">
            We offer hosting from reliable cloud and edge services such as Netlify and Amazon AWS. Your applications will run smoothly and seamlessly across the globe, allowing you to focus on your business goals.
          </p>
          <a href="/"><p class="mt-1 text-blue-500 text-lg">Learn more...</p></a>
        </div>
      </div>
      <div class="flex items-start">
        <span class="flex-shrink-0 rounded-lg bg-gray-800 text-white p-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
          </svg>
        </span>
        <div class="ml-4">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">Logo Design</h2>
          <p class="mt-1 text-lg text-gray-500 dark:text-gray-300">
            We create custom logo designs tailored to our clients' needs, using a collaborative approach to ensure that your vision is accurately reflected in the final product.
          </p>
          <a href="/"><p class="mt-1 text-blue-500 text-lg">Learn more...</p></a>
        </div>
      </div>
      <div class="flex items-start">
        <span class="flex-shrink-0 rounded-lg bg-gray-800 text-white p-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </span>
        <div class="ml-4">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">Consulting</h2>
          <p class="mt-1 text-lg text-gray-500 dark:text-gray-300">
            We provide personalized consulting services to help businesses achieve their goals by leveraging our expertise in software development, project management, and technology strategy.
          </p>
          <a href="/"><p class="mt-1 text-blue-500 text-lg">Learn more...</p></a>
        </div>
      </div>
    </div>
  </div>
</section>

<!----------------- Our Testimonials --------------------->

<section class="bg-white dark:bg-gray-900 mt-40">
  <div class="container px-6 py-10 mx-auto">
      <h1 class="text-5xl font-semibold text-center text-gray-800 capitalize lg:text-5xl dark:text-white">
          What our <span class="text-blue-500 ">clients</span> say
      </h1>

      <section class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 lg:grid-cols-2 xl:grid-cols-3">
          <div class="p-8 border rounded-lg dark:border-gray-700">
              <p class="leading-loose text-lg text-gray-500 dark:text-gray-400 flex gap-0.5">
                  “Working with Coffee Code Studio was a dream come true. 
                  The team listened to my needs and ideas and turned them into a beautiful and functional website that perfectly represents my brand. 
                  The website is not only aesthetically pleasing but also easy to navigate and user-friendly, 
                  ensuring that my customers have an enjoyable experience.”
              </p>

              <div class="flex items-center mt-8 -mx-2">
                  <div class="mx-2">
                      <h1 class="font-semibold text-gray-800 dark:text-white"><bold class="text-blue-500">- David</bold></h1>
                  </div>
              </div>
          </div>

          <div class="p-8 border rounded-lg dark:border-gray-700">
              <p class="leading-loose text-lg text-gray-500 dark:text-gray-400">
                  “What impressed me the most about Coffee Code Studio was their attention to detail and their ability to translate my vision into reality. 
                  They were patient with me throughout the process and always kept me informed of any updates or changes. 
                  They also provided valuable advice and insights to improve the functionality and design of my website.”
              </p>

              <div class="flex items-center mt-8 -mx-2">
                  <div class="mx-2">
                      <h1 class="font-semibold text-gray-800 dark:text-white"><bold class="text-blue-500">- Jacob</bold></h1>
                  </div>
              </div>
          </div>

          <div class="p-8 border rounded-lg dark:border-gray-700">
              <p class="leading-loose text-lg text-gray-500 dark:text-gray-400">
                  “I had an incredible experience collaborating with Coffee Code Studio. 
                  Their team paid close attention to my requirements and transformed them into a stunning website that accurately reflects my brand. 
                  The website's design is visually captivating and intuitive to use, 
                  guaranteeing a delightful user experience for my clients.”
              </p>

              <div class="flex items-center mt-8 -mx-2">
                  <div class="mx-2">
                      <h1 class="font-semibold text-gray-800 dark:text-white"><bold class="text-blue-500">- Nancy</bold></h1>
                  </div>
              </div>
          </div>
      </section>
  </div>
</section>

<!------------------- Get in Touch -------------------->

<section id="contact" class="bg-white dark:bg-gray-900 mb-40 mt-40">
  <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 class="mb-4 text-5xl font-semibold text-center text-gray-900 dark:text-white">Contact Us</h2>
      <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-300 text-xl">Interested in our services? Have a technical question? Reach out to us.</p>


      <div class="mt-6 space-y-8 md:mt-8 mb-8 lg:mb-16">
        <p class="flex items-start -mx-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-2 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>

            <span class="mx-2 text-gray-700 truncate w-72 dark:text-gray-400 lg:text-2xl">(614) 956-9590</span>
        </p>

        <p class="flex items-start -mx-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-2 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>

            <span class="mx-2 text-gray-700 truncate w-72 dark:text-gray-400 lg:text-1xl">coffeecodestudio@protonmail.com</span>
        </p>
    </div>


      <form action="https://submit-form.com/7eWAXhnd" class="space-y-8">
          <div>
            <input
              type="hidden"
              name="_redirect"
              value="https://coffeecodestudio.com/sent"
              />
              <label for="email" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300">Your email</label>
              <input type="email" id="email" name="name" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-700 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="email@gmail.com" required>
          </div>
          <div>
              <label for="subject" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300">Subject</label>
              <input type="text" id="subject" name="name" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-700 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required>
          </div>
          <div class="sm:col-span-2">
              <label for="message" class="block mb-2 text-md font-medium text-gray-900 dark:text-gray-400">Your message</label>
              <textarea id="message" rows="6" name="name" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-700 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
          </div>
          <button type="submit" class="py-3 px-5 text-md font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
      </form>
  </div>
</section>