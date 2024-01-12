<script lang="ts">
    import ServicesInfo from '$lib/ServicesInfo.svelte'
    import logo from '$lib/assets/mobile-apps.png'
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
        title="Mobile Apps"
        image={logo}
        section="In the realm of web design and development, our focus extends to creating responsive websites that cater to a diverse range of devices and screen sizes. Emphasizing aesthetics and functionality, we harness cutting-edge web technologies and design principles to construct sites that are not only visually appealing but also offer seamless user experiences. Our bespoke solutions are tailored to address the unique needs of each client, ensuring that their digital presence effectively communicates their brand and engages their target audience."
    />
</div>