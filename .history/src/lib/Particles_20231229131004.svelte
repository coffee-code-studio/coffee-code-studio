<script lang="ts">
    /*
    import { onMount } from 'svelte'
    import { loadFull } from 'tsparticles'

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
</script>

<svelte:component
    this="{ParticlesComponent}"
    id="tsparticles"
    options="{particlesConfig}"
    on:particlesLoaded="{onParticlesLoaded}"
    particlesInit="{particlesInit}"
/>