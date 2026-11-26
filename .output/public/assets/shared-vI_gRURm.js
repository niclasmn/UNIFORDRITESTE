import { i as Link, l as require_jsx_runtime, n as ArrowRight, r as createLucideIcon, t as Button } from "./button-WFe0k6eS.js";
/**
* @license lucide-react v0.575.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ExternalLink = createLucideIcon("external-link", [
	["path", {
		d: "M15 3h6v6",
		key: "1q9fwt"
	}],
	["path", {
		d: "M10 14 21 3",
		key: "gplh6r"
	}],
	["path", {
		d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
		key: "a6xqqp"
	}]
]);
//#endregion
//#region src/components/pumi/shared.tsx
var import_jsx_runtime = require_jsx_runtime();
function destination(to) {
	const [path, query] = (to ?? "/").split("?");
	return {
		to: path ?? "/",
		search: Object.fromEntries(new URLSearchParams(query))
	};
}
function Go({ to, children, secondary = false, opportunityId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		variant: secondary ? "secondary" : "default",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			...destination(opportunityId ? "/oportunidades/$id" : to),
			params: opportunityId ? { id: opportunityId } : {},
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })]
		})
	});
}
function TextLink({ to, children, opportunityId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		className: "text-link",
		...destination(opportunityId ? "/oportunidades/$id" : to),
		params: opportunityId ? { id: opportunityId } : {},
		children: [
			children,
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 15 })
		]
	});
}
function External({ href, children, secondary = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		variant: secondary ? "secondary" : "default",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href,
			target: "_blank",
			rel: "noreferrer",
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 15 })]
		})
	});
}
function Intro({ crumb, title, description, eyebrow }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "breadcrumb",
			children: crumb.startsWith("ÁREA") ? crumb : `UNIFOR / DRI / ${crumb}`
		}),
		eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "eyebrow",
			children: eyebrow
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "intro",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: title }), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: description })]
		})
	] });
}
function Notice({ title, children, tone = "info" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `notice ${tone}`,
		role: "note",
		children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children })]
	});
}
function SelectField({ label, value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "field",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
			value,
			onChange: (e) => onChange(e.target.value),
			children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: o }, o))
		})]
	});
}
var official = "https://unifor.br/dri/inicial";
var legal = "Resultado apenas orientativo: não garante aprovação e não substitui a conferência documental oficial da DRI.";
function Steps() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
		className: "steps",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Leia o edital e confira as condições acadêmicas" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Faça sua verificação preliminar de elegibilidade" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Planeje carta de aceite, seguro e trâmites consulares" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Candidate-se exclusivamente pelo canal oficial" })
		]
	});
}
//#endregion
export { SelectField as a, legal as c, Notice as i, official as l, Go as n, Steps as o, Intro as r, TextLink as s, External as t };
