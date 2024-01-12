<script lang="ts">
    import ServicesInfo from '$lib/ServicesInfo.svelte'
    import logo from '$lib/assets/logo-design.png'
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
        title="Logo Design"
        image={logo}
        section="Our creative process around creating logos is centered on crafting distinctive and memorable brand symbols that encapsulate the essence of your business. We delve deep into your brand's story, values, and target market to create a logo that not only stands out visually but also conveys the right message to your audience. Our designs are a blend of creativity and strategy, ensuring that the logo not only looks appealing but also aligns with your marketing goals. Attention to detail, from color schemes to typography, is paramount in our approach, ensuring that every element of the logo works harmoniously to create a lasting impression. Whether you're a startup or an established company looking to rebrand, our tailored design process guarantees a unique logo that resonates with your brand identity and engages your customers."
    />
</div>