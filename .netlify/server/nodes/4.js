

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/free-hosting/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.0b6d3707.js","_app/immutable/chunks/index.59519673.js"];
export const stylesheets = [];
export const fonts = [];
