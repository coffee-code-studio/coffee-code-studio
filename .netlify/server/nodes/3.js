

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/about-old/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.15b548f8.js","_app/immutable/chunks/index.2e2480ce.js"];
export const stylesheets = [];
export const fonts = [];
