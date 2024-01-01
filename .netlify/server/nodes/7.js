

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/sent/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.ceb8dddb.js","_app/immutable/chunks/index.59519673.js"];
export const stylesheets = [];
export const fonts = [];
