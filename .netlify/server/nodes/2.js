

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.24fcf4e9.js","_app/immutable/chunks/index.2e2480ce.js","_app/immutable/chunks/stores.fda542ea.js","_app/immutable/chunks/index.fa92fb55.js"];
export const stylesheets = [];
export const fonts = [];
