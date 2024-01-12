export function handleNavigation(node: HTMLElement, params = {}) {
    const specialRoutes = [
        '/seo-digital-marketing',
        '/consulting',
        '/free-hosting',
        '/logo-design',
        '/mobile-apps',
        '/web-design-development'
    ]

    function onClick(event: any) {
        if (specialRoutes.includes(window.location.pathname) && node.getAttribute('href')!.startsWith('#')) {
            event.preventDefault()
            window.location.href = `/${node.getAttribute('href')}`
        }
    }

    node.addEventListener('click', onClick)

    return {
        destroy() {
            node.removeEventListener('click', onClick)
        }
    }
}
