<script lang="ts">
    import ServicesInfo from '$lib/ServicesInfo.svelte'
    import logo from '$lib/assets/web-design-development.png'
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
        title="Web Design and Development"
        image={logo}
        section="In the dynamic field of digital solutions, our focus extends beyond traditional web design to encompass comprehensive web development services. Our approach integrates cutting-edge technology with user-centric design, ensuring each project is not only visually appealing but also functionally robust. By understanding the specific goals and challenges of our clients, we craft responsive, secure, and scalable websites that drive engagement and deliver tangible business value. This holistic methodology positions us as a versatile partner in the evolving digital landscape, catering to a diverse range of industry requirements."
    />
</div>