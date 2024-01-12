<script lang="ts">
    import ServicesInfo from '$lib/ServicesInfo.svelte'
    import logo from '$lib/assets/seo-and-marketing.png'
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
        title="SEO and Digital Marketing"
        image={logo}
        section="SEO and digital marketing are integral components of modern business strategies, focusing on enhancing online visibility and driving customer engagement. Our methodology revolves around a data-driven approach, which ensures that every decision is informed by concrete analytics and user behavior insights. This involves a thorough analysis of keywords and search trends to optimize website content, making it more attractive and relevant to search engines like Google. By improving search engine rankings, we increase the likelihood of your site being found by potential customers."
    />
</div>