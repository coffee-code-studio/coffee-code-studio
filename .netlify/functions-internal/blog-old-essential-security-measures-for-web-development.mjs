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
	mimeTypes: {".png":"image/png",".ico":"image/vnd.microsoft.icon"},
	_: {
		client: {"start":"_app/immutable/entry/start.bcc5f1da.js","app":"_app/immutable/entry/app.cb828e3d.js","imports":["_app/immutable/entry/start.bcc5f1da.js","_app/immutable/chunks/index.2e2480ce.js","_app/immutable/chunks/index.fa92fb55.js","_app/immutable/entry/app.cb828e3d.js","_app/immutable/chunks/preload-helper.cf010ec4.js","_app/immutable/chunks/index.2e2480ce.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/5.js'))
		],
		routes: [
			{
				id: "/blog-old/essential-security-measures-for-web-development",
				pattern: /^\/blog-old\/essential-security-measures-for-web-development\/?$/,
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
