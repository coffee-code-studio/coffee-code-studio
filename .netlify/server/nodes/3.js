

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/consulting/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.a871ee1a.js","_app/immutable/chunks/index.59519673.js"];
export const stylesheets = [];
export const fonts = [];
