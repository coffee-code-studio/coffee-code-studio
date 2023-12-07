export const manifest = (() => {
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
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: __memo(() => import('./entries/endpoints/_server.ts.js'))
			},
			{
				id: "/about-old",
				pattern: /^\/about-old\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/blog-old",
				pattern: /^\/blog-old\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/blog-old/essential-security-measures-for-web-development",
				pattern: /^\/blog-old\/essential-security-measures-for-web-development\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/blog-old/the-importance-of-seo",
				pattern: /^\/blog-old\/the-importance-of-seo\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/blog-old/the-role-of-typography-in-web-design",
				pattern: /^\/blog-old\/the-role-of-typography-in-web-design\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/contact-old",
				pattern: /^\/contact-old\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/sent",
				pattern: /^\/sent\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/sitemap.xml",
				pattern: /^\/sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/sitemap.xml/_server.ts.js'))
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
