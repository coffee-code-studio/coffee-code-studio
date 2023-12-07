

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/sent/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/9.79a716be.js","_app/immutable/chunks/index.2e2480ce.js"];
export const stylesheets = [];
export const fonts = [];
