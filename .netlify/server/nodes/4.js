

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog-old/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.b033b6f2.js","_app/immutable/chunks/index.2e2480ce.js"];
export const stylesheets = [];
export const fonts = [];
