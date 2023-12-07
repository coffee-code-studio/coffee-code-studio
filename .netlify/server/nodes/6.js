import * as server from '../entries/pages/blog-old/the-importance-of-seo/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/blog-old/the-importance-of-seo/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/blog-old/the-importance-of-seo/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.6866c54c.js","_app/immutable/chunks/index.2e2480ce.js"];
export const stylesheets = [];
export const fonts = [];
