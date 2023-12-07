

export const index = 8;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/contact-old/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/8.03a374c9.js","_app/immutable/chunks/index.2e2480ce.js"];
export const stylesheets = [];
export const fonts = [];
