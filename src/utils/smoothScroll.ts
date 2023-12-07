export function smoothScroll(node: any) {
    function handleClick(event: any) {
        const href = node.getAttribute('href')
        if (href && href.startsWith('#')) {
            const section = document.querySelector(href)
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' })
                event.preventDefault()
            }
        }
    }

    node.addEventListener('click', handleClick)

    return {
        destroy() {
            node.removeEventListener('click', handleClick)
        }
    }
}