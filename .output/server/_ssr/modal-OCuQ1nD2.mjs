import { n as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/modal-OCuQ1nD2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Modal({ children, labelledBy, onClose }) {
	const ref = (0, import_react.useRef)(null);
	const closeRef = (0, import_react.useRef)(onClose);
	(0, import_react.useEffect)(() => {
		closeRef.current = onClose;
	}, [onClose]);
	(0, import_react.useEffect)(() => {
		const previous = document.activeElement;
		const el = ref.current;
		if (!el) return;
		const focusables = () => Array.from(el.querySelectorAll("button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex=\"0\"]"));
		focusables()[0]?.focus();
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		function keydown(e) {
			if (e.key === "Escape") {
				e.preventDefault();
				closeRef.current();
			}
			if (e.key === "Tab") {
				const elements = focusables();
				const first = elements[0];
				const last = elements.at(-1);
				if (e.shiftKey && document.activeElement === first) {
					e.preventDefault();
					last?.focus();
				} else if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault();
					first?.focus();
				}
			}
		}
		el.addEventListener("keydown", keydown);
		return () => {
			el.removeEventListener("keydown", keydown);
			document.body.style.overflow = previousOverflow;
			if (previous instanceof HTMLElement) previous.focus();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "modal-backdrop",
		onMouseDown: (e) => {
			if (e.target === e.currentTarget) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref,
			className: "modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": labelledBy,
			children
		})
	});
}
//#endregion
export { Modal as t };
