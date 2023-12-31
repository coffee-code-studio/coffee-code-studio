<script>
    import altMainLogo from '$lib/assets/ccs-alt-logo.png'

    export let title: ''
  </script>
  
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