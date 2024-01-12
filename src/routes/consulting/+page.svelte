<script lang="ts">
  import ServicesInfo from '$lib/ServicesInfo.svelte'
  import logo from '$lib/assets/consulting.png'
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
      title="Consulting"
      image={logo}
      section="In our consulting services, we focus on providing customized guidance and strategies tailored to each client's unique challenges and objectives. Our consultancy goes beyond just creating websites or applications; we delve into understanding your business model, market, and customer needs. By combining our expertise in user experience, technology trends, and digital strategy, we help businesses navigate the complex web landscape to build effective, sustainable online presences. Our role is to empower your team with the knowledge and tools necessary for success, ensuring that every digital initiative aligns with your broader business goals."
  />
</div>