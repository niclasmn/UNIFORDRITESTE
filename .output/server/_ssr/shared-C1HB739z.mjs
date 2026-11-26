import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as Button } from "./button-DNa9Cg5A.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as ExternalLink, x as ArrowRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shared-C1HB739z.js
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
