

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/mobile-apps/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.0b6d3707.js","_app/immutable/chunks/index.59519673.js"];
export const stylesheets = [];
export const fonts = [];
