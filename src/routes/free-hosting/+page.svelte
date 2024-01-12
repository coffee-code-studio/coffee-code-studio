<script lang="ts">
    import ServicesInfo from '$lib/ServicesInfo.svelte'
    import logo from '$lib/assets/free-hosting.png'
    import { isMenuOpenStore } from '$lib/stores'

    let isMenuOpen = false
    isMenuOpenStore.subscribe(value => { isMenuOpen = value; })
</script>

<style>
    @media (max-width: 768px) {
        .hide-on-mobile-menu-open {
            display: none;
        }
    }
</style>


<div class={isMenuOpen ? 'hide-on-mobile-menu' : ''}>
    <ServicesInfo 
        title="Free Hosting"
        image={logo}
        section="In our commitment to delivering comprehensive web solutions, we focus not just on robust hosting but also on seamless integration with content management systems and e-commerce platforms. Understanding the importance of a strong online presence, we align our hosting services with platforms like Shopify. This integration ensures that your site is not only fast and reliable but also versatile and user-friendly, catering to the evolving needs of your business. Our emphasis on compatibility and performance optimization means that your website will not only be securely hosted but also primed for growth, adapting effortlessly to increasing traffic and business scaling needs."
    />
</div>