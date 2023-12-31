<script lang="ts">
    import { onMount } from 'svelte'
    import { loadSlim } from '@tsparticles/slim'
    import Particles, { particlesInit } from '@tsparticles/svelte'
    import type { Engine } from '@tsparticles/engine'

    let ParticlesComponent: any

    onMount(async () => {
        const module = await import('@tsparticles/svelte')

        ParticlesComponent = module.default
    })

    let particlesConfig = {
        particles: {
            color: {
                value: "#000",
            },
            links: {
                enable: true,
                color: "#000",
            },
            move: {
                enable: true,
            },
            number: {
                value: 100,
            },
        },
    }

    let onParticlesLoaded = (event: CustomEvent) => {
        const particlesContainer = event.detail.particles
    }

    void particlesInit(async (engine: Engine) => {
        await loadSlim(engine)
    })

    /*
    let particlesInit = async (engine: Engine) => {
        await loadSlim(engine)
    }
    */
</script>

<svelte:component
    this="{ParticlesComponent}"
    id="tsparticles"
    class="foo bar"
    style=""
    options="{particlesConfig}"
    on:particlesLoaded="{onParticlesLoaded}"
    particlesInit="{particlesInit}"
/>