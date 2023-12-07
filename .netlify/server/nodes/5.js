import * as server from '../entries/pages/blog-old/essential-security-measures-for-web-development/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog-old/essential-security-measures-for-web-development/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog-old/essential-security-measures-for-web-development/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.9c955fed.js","_app/immutable/chunks/index.2e2480ce.js"];
export const stylesheets = [];
export const fonts = [];
