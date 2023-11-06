<script>
    import { onMount } from 'svelte'
  
    let showArrow = true
    const hideArrowThreshold = 100
  
    onMount(() => {
        const handleScroll = () => {
            if (window.scrollY > hideArrowThreshold) {
                showArrow = false
                window.removeEventListener('scroll', handleScroll)

            }
        }
  
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })
</script>
  
{#if showArrow}
    <img src="path-to-your-down-arrow-image.png" alt="Scroll down" class="mx-auto w-8 h-8 animate-bounce sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24">
{/if}