import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["ccs-alt-logo.png","coffee-code-studio-logo.png","favicon.ico","importance-of-seo.png","role-of-typography.png","security-measures.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.c783445a.js","app":"_app/immutable/entry/app.30c62326.js","imports":["_app/immutable/entry/start.c783445a.js","_app/immutable/chunks/index.59519673.js","_app/immutable/chunks/index.a7b8e33d.js","_app/immutable/entry/app.30c62326.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/index.59519673.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/7.js'))
		],
		routes: [
			{
				id: "/sent",
				pattern: /^\/sent\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})());
