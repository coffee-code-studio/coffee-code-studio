import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.92ed671e.js","_app/immutable/chunks/index.59519673.js","_app/immutable/chunks/smoothScroll.e49f1090.js","_app/immutable/chunks/index.a7b8e33d.js"];
export const stylesheets = ["_app/immutable/assets/2.a2475ac3.css"];
export const fonts = [];
