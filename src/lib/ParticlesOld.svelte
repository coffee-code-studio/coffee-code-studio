<script lang="ts">
    /*
    import { onMount } from 'svelte'
    import { loadSlim } from '@tsparticles/slim'
    import { particlesInit } from '@tsparticles/svelte'
    import type { Engine } from '@tsparticles/engine'

    
    let ParticlesComponent: any

    onMount(async () => {
        const module = await import('@tsparticles/svelte')

        ParticlesComponent = module.default
    })

    let particlesConfig = {
        particles: {
            color: {
                value: '#ffff',
            },
            move: {
                direction: 'none',
                enable: true,
                outModes: {
                    default: 'out',
                },
                random: true,
                speed: 0.1,
                straight: false,
            },
            links: {
                enable: false,
                color: '#000',
            },
            number: {
                value: 100,
            },
            opacity: {
                animation: {
                    enable: true,
                    speed: 1,
                    sync: false,
                },
                value: { min: 0, max: 1 },
            },
            size: {
                value: { min: 1, max: 3 },
            },
        },
    }

    let onParticlesLoaded = (event: CustomEvent) => {
        const particlesContainer = event.detail.particles
    }

    void particlesInit(async (engine: Engine) => {
        await loadSlim(engine)
    })
    */
</script>

<!---
<svelte:component
    this="{ParticlesComponent}"
    id="tsparticles"
    class="foo bar"
    style=""
    options="{particlesConfig}"
    on:particlesLoaded="{onParticlesLoaded}"
    particlesInit="{particlesInit}"
/>
--->