globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/acessibilidade-Rt5jUSCc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d6-ysF4P+igxRuc70QcmIabM0EbERU\"",
		"mtime": "2026-11-26T14:39:26.938Z",
		"size": 214,
		"path": "../public/assets/acessibilidade-Rt5jUSCc.js"
	},
	"/assets/admin-De_DwB28.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8366-JVAXuEl8N2GfcVql+KhqFUM4PmI\"",
		"mtime": "2026-11-26T14:39:26.938Z",
		"size": 33638,
		"path": "../public/assets/admin-De_DwB28.js"
	},
	"/assets/arrival-guide-BNuVaDX3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c3-pC8x/nbXqG+Yuk4YdAS0dLV/W20\"",
		"mtime": "2026-11-26T14:39:26.938Z",
		"size": 195,
		"path": "../public/assets/arrival-guide-BNuVaDX3.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-11-26T14:39:28.735Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/button-WFe0k6eS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44fbb-QvVaINXFZ6kpLID52xYOQ3CCOIc\"",
		"mtime": "2026-11-26T14:39:26.938Z",
		"size": 282555,
		"path": "../public/assets/button-WFe0k6eS.js"
	},
	"/assets/comparador-CBa3YNVG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-klva19KGHu13dMzhdzohuCnCRQA\"",
		"mtime": "2026-11-26T14:39:26.939Z",
		"size": 196,
		"path": "../public/assets/comparador-CBa3YNVG.js"
	},
	"/assets/docentes-C0GySYPa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21e4-UjiceYAgxAzdWbhM+8lrFLHZB1I\"",
		"mtime": "2026-11-26T14:39:26.939Z",
		"size": 8676,
		"path": "../public/assets/docentes-C0GySYPa.js"
	},
	"/assets/gestao-C1dlv7G7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c1-Na0L5OOgvh6M6xwA1NC9EbHmjYQ\"",
		"mtime": "2026-11-26T14:39:26.939Z",
		"size": 193,
		"path": "../public/assets/gestao-C1dlv7G7.js"
	},
	"/assets/guias-tqEjy5SV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bd-RhRiVn6FFm+gL+w/xVyTcKY1SKA\"",
		"mtime": "2026-11-26T14:39:26.939Z",
		"size": 189,
		"path": "../public/assets/guias-tqEjy5SV.js"
	},
	"/assets/guides-B6mlZ3St.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3eca-v78W1P2IOH16KOnd1M9M9oYSccg\"",
		"mtime": "2026-11-26T14:39:26.939Z",
		"size": 16074,
		"path": "../public/assets/guides-B6mlZ3St.js"
	},
	"/assets/info-C_wuyc6v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3510-v4L6soint41oAjehZAsu45QRbS8\"",
		"mtime": "2026-11-26T14:39:26.939Z",
		"size": 13584,
		"path": "../public/assets/info-C_wuyc6v.js"
	},
	"/assets/map-pin-C0iv1QH2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"200-D6QbRsTLBQntfam7WPcHj4RbERg\"",
		"mtime": "2026-11-26T14:39:26.939Z",
		"size": 512,
		"path": "../public/assets/map-pin-C0iv1QH2.js"
	},
	"/assets/minha-dri-BbwT3N34.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3439-bkBgejTMuOmqBfPJB+03FaJze50\"",
		"mtime": "2026-11-26T14:39:26.939Z",
		"size": 13369,
		"path": "../public/assets/minha-dri-BbwT3N34.js"
	},
	"/assets/modal-Bvj6S8Ph.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7dd-a62tiV71sJOKmSDCf5EID/87/rs\"",
		"mtime": "2026-11-26T14:39:26.939Z",
		"size": 2013,
		"path": "../public/assets/modal-Bvj6S8Ph.js"
	},
	"/assets/oportunidades-C-b6u5NA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"914e-P/YFNTy0rn/+safqtDcdiv98mc4\"",
		"mtime": "2026-11-26T14:39:26.939Z",
		"size": 37198,
		"path": "../public/assets/oportunidades-C-b6u5NA.js"
	},
	"/assets/contatos-Cscty5IX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc-9oBjhPBSFTyN8z4UsFFIvfSF1wI\"",
		"mtime": "2026-11-26T14:39:26.939Z",
		"size": 188,
		"path": "../public/assets/contatos-Cscty5IX.js"
	},
	"/assets/privacidade-DHX0zwCV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bf-wnYChb+5KdSBdnaHLY6jF/GZ9dw\"",
		"mtime": "2026-11-26T14:39:26.939Z",
		"size": 191,
		"path": "../public/assets/privacidade-DHX0zwCV.js"
	},
	"/assets/quiz-BeuxBA6a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-zmcPWCF9kYA3LpiMxgFNcTpHLIM\"",
		"mtime": "2026-11-26T14:39:26.939Z",
		"size": 178,
		"path": "../public/assets/quiz-BeuxBA6a.js"
	},
	"/assets/quiz-CcZH1vjs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ca4-GvW3ovqQhsYmmOcgMuRqeuVibSs\"",
		"mtime": "2026-11-26T14:39:26.939Z",
		"size": 11428,
		"path": "../public/assets/quiz-CcZH1vjs.js"
	},
	"/assets/routes-B16CJ2nh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f6e-za70edVp7w5VhYNObsnRUTPSNag\"",
		"mtime": "2026-11-26T14:39:26.939Z",
		"size": 12142,
		"path": "../public/assets/routes-B16CJ2nh.js"
	},
	"/assets/marketing-DvpuTiYb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c2-8CM7+R1qAxeFF9BSQnO371fJjXw\"",
		"mtime": "2026-11-26T14:39:26.939Z",
		"size": 194,
		"path": "../public/assets/marketing-DvpuTiYb.js"
	},
	"/assets/index-BqpXV6Ca.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d0405-K18sImNgitd75VAsYeMA6cHld1c\"",
		"mtime": "2026-11-26T14:39:26.938Z",
		"size": 852997,
		"path": "../public/assets/index-BqpXV6Ca.js"
	},
	"/assets/oportunidades_._id-Qgjr1OnN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ad6-M6PnFOpE59DAxrDXvWb4HqTIypc\"",
		"mtime": "2026-11-26T14:39:26.939Z",
		"size": 15062,
		"path": "../public/assets/oportunidades_._id-Qgjr1OnN.js"
	},
	"/assets/circle-check-f5s0812n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b9-nLtV4x4Ql+qjqOZc/hkLdUMIOfI\"",
		"mtime": "2026-11-26T14:39:26.939Z",
		"size": 441,
		"path": "../public/assets/circle-check-f5s0812n.js"
	},
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"1642-TPN2ugD75PMCUz7poXZXVTjCDf0\"",
		"mtime": "2026-11-26T14:39:28.734Z",
		"size": 5698,
		"path": "../public/favicon.png"
	},
	"/assets/shared-vI_gRURm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11b0-FMa+kxjz7a67GqmUJE/1OtO78Gk\"",
		"mtime": "2026-11-26T14:39:26.939Z",
		"size": 4528,
		"path": "../public/assets/shared-vI_gRURm.js"
	},
	"/assets/sobre-HrkvvtuV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b5-1HUzNrZuUC6gy/m1cJonm/ZDpZg\"",
		"mtime": "2026-11-26T14:39:26.939Z",
		"size": 181,
		"path": "../public/assets/sobre-HrkvvtuV.js"
	},
	"/assets/students.asset-Hay9TOP3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21e-XORTDxiiorHSkb/D7ElNlZnXXCQ\"",
		"mtime": "2026-11-26T14:39:26.939Z",
		"size": 542,
		"path": "../public/assets/students.asset-Hay9TOP3.js"
	},
	"/assets/styles-DLZAU9vf.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1acd5-Ef6qcE/V3Ll3olFZIsZg+0Kxe88\"",
		"mtime": "2026-11-26T14:39:26.939Z",
		"size": 109781,
		"path": "../public/assets/styles-DLZAU9vf.css"
	},
	"/assets/useMatch-V3F6yQtS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e5a-IoxPnJ/dd2GIt/gUOFY3pyrM1K8\"",
		"mtime": "2026-11-26T14:39:26.939Z",
		"size": 7770,
		"path": "../public/assets/useMatch-V3F6yQtS.js"
	},
	"/standalone/index.html": {
		"type": "text/html; charset=utf-8",
		"etag": "\"3826a-NgYkCd8egyH3nCJ5V22rHcVIN20\"",
		"mtime": "2026-11-26T14:39:28.734Z",
		"size": 229994,
		"path": "../public/standalone/index.html"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_0jRgqU = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_0jRgqU
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
