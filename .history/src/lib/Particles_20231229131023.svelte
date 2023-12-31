<script lang="ts">
        import { onMount } from 'svelte'
    import { loadFull } from 'tsparticles'

    let ParticlesComponent: any

    onMount(async () => {
        try {
            const module = await import('svelte-particles')
            ParticlesComponent = module.default
            console.log('ParticlesComponent loaded:', ParticlesComponent)
        } catch (error) {
            console.error('Error loading ParticlesComponent:', error)
        }
    })

    let particlesConfig = {
        // ... your particlesConfig object
    }
    console.log('particlesConfig:', particlesConfig)

    let onParticlesLoaded = (e: any) => {
        const particlesContainer = e.detail.particles
        console.log('Particles loaded:', particlesContainer)
    }

    let particlesInit = async (main: any) => {
        try {
            await loadFull(main)
            console.log('Particles initialized with main:', main)
        } catch (error) {
            console.error('Error initializing particles:', error)
        }
    }

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
    */
</script>

<svelte:component
    this="{ParticlesComponent}"
    id="tsparticles"
    options="{particlesConfig}"
    on:particlesLoaded="{onParticlesLoaded}"
    particlesInit="{particlesInit}"
/>