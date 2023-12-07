import * as server from '../entries/pages/blog-old/the-role-of-typography-in-web-design/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog-old/the-role-of-typography-in-web-design/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog-old/the-role-of-typography-in-web-design/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.0ecd8904.js","_app/immutable/chunks/index.2e2480ce.js"];
export const stylesheets = [];
export const fonts = [];
