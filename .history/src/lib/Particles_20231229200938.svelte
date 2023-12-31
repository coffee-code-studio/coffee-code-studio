<script lang="ts">
    import { onMount } from 'svelte'
    import { loadSlim } from '@tsparticles/slim'

    let ParticlesComponent

    onMount(async () => {
        const module = await import('@tsparticles/svelte')

        ParticlesComponent = module.default
    })

    let particlesUrl = 'http://foo.bar/particles.json'

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

    let onParticlesLoaded = (event: any) => {
        const particlesContainer = event.detail.particles
        // you can use particlesContainer to call all the Container class
        // (from the core library) methods like play, pause, refresh, start, stop
    }

    let particlesInit = async (engine: any) => {
        // you can use main to customize the tsParticles instance adding presets or custom shapes
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        //await loadFull(main);
        await loadSlim(engine)
    }

    /*

    let ParticlesComponent: any

    onMount(async () => {
        const module = await import('svelte-particles')

        ParticlesComponent = module.default
    })

    let particlesConfig = {
        particles: {
            move: {
                enable: true,
                random: true,
                speed: 0.1,
                straight: false
            },
            opacity: {
                animation: {
                    enable: true,
                    speed: 1,
                    sync: false
                },
                value: { min: 0, max: 1 }
            },
            size: {
                value: { min: 1, max: 3 }
            }
        }
    }

    let onParticlesLoaded = (e: any) => {
        const particlesContainer = e.detail.particles
    }

    let particlesInit = async (main: any) => {
        await loadFull(main)
    }
    */
</script>



<!---
<svelte:component
    this="{ParticlesComponent}"
    id="tsparticles"
    options="{particlesConfig}"
    on:particlesLoaded="{onParticlesLoaded}"
    particlesInit="{particlesInit}"
/>
--->