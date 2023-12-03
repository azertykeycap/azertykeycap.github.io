import { renderers } from '../../renderers.mjs';
import { onRequest } from '../../_empty-middleware.mjs';
import { c as createExports, a as adapter } from '../../chunks/entrypoint_957b95ae.mjs';
import { manifest } from '../../manifest_1ed3a984.mjs';
import 'preact';
import 'preact-render-to-string';
import 'cookie';
import 'kleur/colors';
import '../../chunks/pages/_slug__d42d2eec.mjs';
/* empty css                                     */import '../../chunks/astro_732cf17d.mjs';
import 'clsx';
import 'html-escaper';
/* empty css                                      *//* empty css                                      */import 'contentful';
import 'radash';
import 'preact/hooks';
import '@unpic/preact';
/* empty css                                      */import 'preact/jsx-runtime';
import 'node:fs';
import 'node:http';
import 'node:tls';
import 'node:crypto';
import 'node:stream/web';
import 'undici';
import 'fast-glob';
import 'node:path';
import 'node:url';
import 'node:fs/promises';
import 'set-cookie-parser';
import 'string-width';
import 'mime';
import 'path-to-regexp';

const page = () => import('../../chunks/pages/og_33f08caf.mjs');

const pageModule = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	onRequest,
	page,
	renderers
}, Symbol.toStringTag, { value: 'Module' }));

const _manifest = Object.assign(manifest, {
	pageModule,
	renderers,
});
const _args = undefined;

const _exports = createExports(_manifest);
const _default = _exports['default'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { _default as default, pageModule };
