

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.d051454c.js","_app/immutable/chunks/index.59519673.js"];
export const stylesheets = [];
export const fonts = [];
