import { serialize, parse } from 'cookie';
import { bold } from 'kleur/colors';
import 'string-width';
import { A as AstroError, w as ResponseSentError, y as MiddlewareNoDataOrNextCalled, z as MiddlewareNotAResponse, B as ASTRO_VERSION, C as ClientAddressNotAvailable, S as StaticClientAddressNotAvailable, D as renderEndpoint, p as LocalsNotAnObject } from './chunks/astro_732cf17d.mjs';
import 'clsx';
import mime from 'mime';
import { compile } from 'path-to-regexp';
import 'html-escaper';

const DELETED_EXPIRATION = /* @__PURE__ */ new Date(0);
const DELETED_VALUE = "deleted";
const responseSentSymbol = Symbol.for("astro.responseSent");
class AstroCookie {
  constructor(value) {
    this.value = value;
  }
  json() {
    if (this.value === void 0) {
      throw new Error(`Cannot convert undefined to an object.`);
    }
    return JSON.parse(this.value);
  }
  number() {
    return Number(this.value);
  }
  boolean() {
    if (this.value === "false")
      return false;
    if (this.value === "0")
      return false;
    return Boolean(this.value);
  }
}
class AstroCookies {
  #request;
  #requestValues;
  #outgoing;
  constructor(request) {
    this.#request = request;
    this.#requestValues = null;
    this.#outgoing = null;
  }
  /**
   * Astro.cookies.delete(key) is used to delete a cookie. Using this method will result
   * in a Set-Cookie header added to the response.
   * @param key The cookie to delete
   * @param options Options related to this deletion, such as the path of the cookie.
   */
  delete(key, options) {
    const serializeOptions = {
      expires: DELETED_EXPIRATION
    };
    if (options?.domain) {
      serializeOptions.domain = options.domain;
    }
    if (options?.path) {
      serializeOptions.path = options.path;
    }
    this.#ensureOutgoingMap().set(key, [
      DELETED_VALUE,
      serialize(key, DELETED_VALUE, serializeOptions),
      false
    ]);
  }
  /**
   * Astro.cookies.get(key) is used to get a cookie value. The cookie value is read from the
   * request. If you have set a cookie via Astro.cookies.set(key, value), the value will be taken
   * from that set call, overriding any values already part of the request.
   * @param key The cookie to get.
   * @returns An object containing the cookie value as well as convenience methods for converting its value.
   */
  get(key) {
    if (this.#outgoing?.has(key)) {
      let [serializedValue, , isSetValue] = this.#outgoing.get(key);
      if (isSetValue) {
        return new AstroCookie(serializedValue);
      } else {
        return void 0;
      }
    }
    const values = this.#ensureParsed();
    if (key in values) {
      const value = values[key];
      return new AstroCookie(value);
    }
  }
  /**
   * Astro.cookies.has(key) returns a boolean indicating whether this cookie is either
   * part of the initial request or set via Astro.cookies.set(key)
   * @param key The cookie to check for.
   * @returns
   */
  has(key) {
    if (this.#outgoing?.has(key)) {
      let [, , isSetValue] = this.#outgoing.get(key);
      return isSetValue;
    }
    const values = this.#ensureParsed();
    return !!values[key];
  }
  /**
   * Astro.cookies.set(key, value) is used to set a cookie's value. If provided
   * an object it will be stringified via JSON.stringify(value). Additionally you
   * can provide options customizing how this cookie will be set, such as setting httpOnly
   * in order to prevent the cookie from being read in client-side JavaScript.
   * @param key The name of the cookie to set.
   * @param value A value, either a string or other primitive or an object.
   * @param options Options for the cookie, such as the path and security settings.
   */
  set(key, value, options) {
    let serializedValue;
    if (typeof value === "string") {
      serializedValue = value;
    } else {
      let toStringValue = value.toString();
      if (toStringValue === Object.prototype.toString.call(value)) {
        serializedValue = JSON.stringify(value);
      } else {
        serializedValue = toStringValue;
      }
    }
    const serializeOptions = {};
    if (options) {
      Object.assign(serializeOptions, options);
    }
    this.#ensureOutgoingMap().set(key, [
      serializedValue,
      serialize(key, serializedValue, serializeOptions),
      true
    ]);
    if (this.#request[responseSentSymbol]) {
      throw new AstroError({
        ...ResponseSentError
      });
    }
  }
  /**
   * Astro.cookies.header() returns an iterator for the cookies that have previously
   * been set by either Astro.cookies.set() or Astro.cookies.delete().
   * This method is primarily used by adapters to set the header on outgoing responses.
   * @returns
   */
  *headers() {
    if (this.#outgoing == null)
      return;
    for (const [, value] of this.#outgoing) {
      yield value[1];
    }
  }
  #ensureParsed() {
    if (!this.#requestValues) {
      this.#parse();
    }
    if (!this.#requestValues) {
      this.#requestValues = {};
    }
    return this.#requestValues;
  }
  #ensureOutgoingMap() {
    if (!this.#outgoing) {
      this.#outgoing = /* @__PURE__ */ new Map();
    }
    return this.#outgoing;
  }
  #parse() {
    const raw = this.#request.headers.get("cookie");
    if (!raw) {
      return;
    }
    this.#requestValues = parse(raw);
  }
}

const astroCookiesSymbol = Symbol.for("astro.cookies");
function attachCookiesToResponse(response, cookies) {
  Reflect.set(response, astroCookiesSymbol, cookies);
}
function getFromResponse(response) {
  let cookies = Reflect.get(response, astroCookiesSymbol);
  if (cookies != null) {
    return cookies;
  } else {
    return void 0;
  }
}
function* getSetCookiesFromResponse(response) {
  const cookies = getFromResponse(response);
  if (!cookies) {
    return [];
  }
  for (const headerValue of cookies.headers()) {
    yield headerValue;
  }
  return [];
}

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit"
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message
  };
  if (levels[logLevel] > levels[level]) {
    return;
  }
  dest.write(event);
}
function info(opts, label, message) {
  return log(opts, "info", label, message);
}
function warn(opts, label, message) {
  return log(opts, "warn", label, message);
}
function error(opts, label, message) {
  return log(opts, "error", label, message);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message) {
    info(this.options, label, message);
  }
  warn(label, message) {
    warn(this.options, label, message);
  }
  error(label, message) {
    error(this.options, label, message);
  }
  debug(label, message, ...args) {
    debug(this.options, label, message, args);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.options, this.label, message);
  }
}

async function callMiddleware(logger, onRequest, apiContext, responseFunction) {
  let nextCalled = false;
  let responseFunctionPromise = void 0;
  const next = async () => {
    nextCalled = true;
    responseFunctionPromise = responseFunction();
    return responseFunctionPromise;
  };
  let middlewarePromise = onRequest(apiContext, next);
  return await Promise.resolve(middlewarePromise).then(async (value) => {
    if (isEndpointOutput(value)) {
      logger.warn(
        "middleware",
        `Using simple endpoints can cause unexpected issues in the chain of middleware functions.
It's strongly suggested to use full ${bold("Response")} objects.`
      );
    }
    if (nextCalled) {
      if (typeof value !== "undefined") {
        if (value instanceof Response === false) {
          throw new AstroError(MiddlewareNotAResponse);
        }
        return value;
      } else {
        if (responseFunctionPromise) {
          return responseFunctionPromise;
        } else {
          throw new AstroError(MiddlewareNotAResponse);
        }
      }
    } else if (typeof value === "undefined") {
      throw new AstroError(MiddlewareNoDataOrNextCalled);
    } else if (value instanceof Response === false) {
      throw new AstroError(MiddlewareNotAResponse);
    } else {
      return value;
    }
  });
}
function isEndpointOutput(endpointResult) {
  return !(endpointResult instanceof Response) && typeof endpointResult === "object" && typeof endpointResult.body === "string";
}

const encoder = new TextEncoder();
const clientAddressSymbol = Symbol.for("astro.clientAddress");
const clientLocalsSymbol = Symbol.for("astro.locals");
function createAPIContext({
  request,
  params,
  site,
  props,
  adapterName
}) {
  initResponseWithEncoding();
  const context = {
    cookies: new AstroCookies(request),
    request,
    params,
    site: site ? new URL(site) : void 0,
    generator: `Astro v${ASTRO_VERSION}`,
    props,
    redirect(path, status) {
      return new Response(null, {
        status: status || 302,
        headers: {
          Location: path
        }
      });
    },
    ResponseWithEncoding,
    url: new URL(request.url),
    get clientAddress() {
      if (!(clientAddressSymbol in request)) {
        if (adapterName) {
          throw new AstroError({
            ...ClientAddressNotAvailable,
            message: ClientAddressNotAvailable.message(adapterName)
          });
        } else {
          throw new AstroError(StaticClientAddressNotAvailable);
        }
      }
      return Reflect.get(request, clientAddressSymbol);
    }
  };
  Object.defineProperty(context, "locals", {
    enumerable: true,
    get() {
      return Reflect.get(request, clientLocalsSymbol);
    },
    set(val) {
      if (typeof val !== "object") {
        throw new AstroError(LocalsNotAnObject);
      } else {
        Reflect.set(request, clientLocalsSymbol, val);
      }
    }
  });
  return context;
}
let ResponseWithEncoding;
let initResponseWithEncoding = () => {
  class LocalResponseWithEncoding extends Response {
    constructor(body, init, encoding) {
      if (typeof body === "string") {
        if (typeof Buffer !== "undefined" && Buffer.from) {
          body = Buffer.from(body, encoding);
        } else if (encoding == null || encoding === "utf8" || encoding === "utf-8") {
          body = encoder.encode(body);
        }
      }
      super(body, init);
      if (encoding) {
        this.headers.set("X-Astro-Encoding", encoding);
      }
    }
  }
  ResponseWithEncoding = LocalResponseWithEncoding;
  initResponseWithEncoding = () => {
  };
  return LocalResponseWithEncoding;
};
async function callEndpoint(mod, env, ctx, onRequest) {
  const context = createAPIContext({
    request: ctx.request,
    params: ctx.params,
    props: ctx.props,
    site: env.site,
    adapterName: env.adapterName
  });
  let response;
  if (onRequest) {
    response = await callMiddleware(
      env.logger,
      onRequest,
      context,
      async () => {
        return await renderEndpoint(mod, context, env.ssr, env.logger);
      }
    );
  } else {
    response = await renderEndpoint(mod, context, env.ssr, env.logger);
  }
  const isEndpointSSR = env.ssr && !ctx.route?.prerender;
  if (response instanceof Response) {
    if (isEndpointSSR && response.headers.get("X-Astro-Encoding")) {
      env.logger.warn(
        "ssr",
        "`ResponseWithEncoding` is ignored in SSR. Please return an instance of Response. See https://docs.astro.build/en/core-concepts/endpoints/#server-endpoints-api-routes for more information."
      );
    }
    attachCookiesToResponse(response, context.cookies);
    return response;
  }
  env.logger.warn(
    "astro",
    `${ctx.route.component} returns a simple object which is deprecated. Please return an instance of Response. See https://docs.astro.build/en/core-concepts/endpoints/#server-endpoints-api-routes for more information.`
  );
  if (isEndpointSSR) {
    if (response.hasOwnProperty("headers")) {
      env.logger.warn(
        "ssr",
        "Setting headers is not supported when returning an object. Please return an instance of Response. See https://docs.astro.build/en/core-concepts/endpoints/#server-endpoints-api-routes for more information."
      );
    }
    if (response.encoding) {
      env.logger.warn(
        "ssr",
        "`encoding` is ignored in SSR. To return a charset other than UTF-8, please return an instance of Response. See https://docs.astro.build/en/core-concepts/endpoints/#server-endpoints-api-routes for more information."
      );
    }
  }
  let body;
  const headers = new Headers();
  const pathname = ctx.route ? (
    // Try the static route `pathname`
    ctx.route.pathname ?? // Dynamic routes don't include `pathname`, so synthesize a path for these (e.g. 'src/pages/[slug].svg')
    ctx.route.segments.map((s) => s.map((p) => p.content).join("")).join("/")
  ) : (
    // Fallback to pathname of the request
    ctx.pathname
  );
  const mimeType = mime.getType(pathname) || "text/plain";
  headers.set("Content-Type", `${mimeType};charset=utf-8`);
  if (response.encoding) {
    headers.set("X-Astro-Encoding", response.encoding);
  }
  if (response.body instanceof Uint8Array) {
    body = response.body;
    headers.set("Content-Length", body.byteLength.toString());
  } else if (typeof Buffer !== "undefined" && Buffer.from) {
    body = Buffer.from(response.body, response.encoding);
    headers.set("Content-Length", body.byteLength.toString());
  } else if (response.encoding == null || response.encoding === "utf8" || response.encoding === "utf-8") {
    body = encoder.encode(response.body);
    headers.set("Content-Length", body.byteLength.toString());
  } else {
    body = response.body;
  }
  response = new Response(body, {
    status: 200,
    headers
  });
  attachCookiesToResponse(response, context.cookies);
  return response;
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"_meta":{"trailingSlash":"ignore"}}},{"file":"informations/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/informations","type":"page","pattern":"^\\/informations\\/?$","segments":[[{"content":"informations","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/informations.astro","pathname":"/informations","prerender":true,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/image-endpoint.js","pathname":"/_image","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":":root{--bnws3p0: #000000;--bnws3p1: #ffffff;--bnws3p2: #f8fafc;--bnws3p3: #f1f5f9;--bnws3p4: #e2e8f0;--bnws3p5: #cbd5e1;--bnws3p6: #94a3b8;--bnws3p7: #64748b;--bnws3p8: #475569;--bnws3p9: #334155;--bnws3pa: #1e293b;--bnws3pb: #0f172a;--bnws3pc: #eef2ff;--bnws3pd: #e0e7ff;--bnws3pe: #c7d2fe;--bnws3pf: #a5b4fc;--bnws3pg: #818cf8;--bnws3ph: #6366f1;--bnws3pi: #4f46e5;--bnws3pj: #4338ca;--bnws3pk: #3730a3;--bnws3pl: #312e81;--bnws3pm: #ccfbf1;--bnws3pn: #14b8a6;--bnws3po: #0d9488;--bnws3pp: #0f766e;--bnws3pq: #f59e0b;--bnws3pr: #fee2e2;--bnws3ps: #dc2626;--bnws3pt: #b91c1c;--bnws3pu: #991b1b;--bnws3pv: \"Inter\", \"ui-sans-serif\", \"system-ui\", \"-apple-system\", \"BlinkMacSystemFont\", \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", \"Arial\", \"Noto Sans\", \"sans-serif\", \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";--bnws3pw: 16px;--bnws3px: .75rem;--bnws3py: .875rem;--bnws3pz: 1rem;--bnws3p10: 1.25rem;--bnws3p11: 1.5rem;--bnws3p12: 2rem;--bnws3p13: 400;--bnws3p14: 500;--bnws3p15: 600;--bnws3p16: 700;--bnws3p17: 2px}\n._1bu4s8l0{font-size:3rem;line-height:1;font-weight:700;letter-spacing:-.05em}._1bu4s8l1{margin-top:2rem;display:flex;flex-direction:column;gap:3.5rem}._1bu4s8l2{display:grid;margin-left:auto;margin-right:auto;margin-top:2rem;grid-template-columns:repeat(1,minmax(0,1fr));gap:2rem;grid-auto-rows:minmax(0,1fr)}._1bu4s8l3{color:var(--bnws3pi)}._1bu4s8l4{color:var(--bnws3pa)}@media screen and (min-width: 640px){._1bu4s8l0{font-size:4.5rem;line-height:1}}@media screen and (min-width: 1024px){._1bu4s8l2{margin-left:0;margin-right:0;max-width:none;grid-template-columns:repeat(3,minmax(0,1fr))}}@media (prefers-color-scheme: dark){._1bu4s8l3{color:var(--bnws3pg)}._1bu4s8l4{color:var(--bnws3p4)}}\n"}],"routeData":{"route":"/index.styles.css","type":"endpoint","pattern":"^\\/index\\.styles\\.css$","segments":[[{"content":"index.styles.css","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/index.styles.css.ts","pathname":"/index.styles.css","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.ec606762.js"}],"styles":[{"type":"external","src":"/_astro/index.0fd9929b.css"},{"type":"external","src":"/_astro/_slug_.34175ed2.css"},{"type":"inline","content":":root{--bnws3p0: #000000;--bnws3p1: #ffffff;--bnws3p2: #f8fafc;--bnws3p3: #f1f5f9;--bnws3p4: #e2e8f0;--bnws3p5: #cbd5e1;--bnws3p6: #94a3b8;--bnws3p7: #64748b;--bnws3p8: #475569;--bnws3p9: #334155;--bnws3pa: #1e293b;--bnws3pb: #0f172a;--bnws3pc: #eef2ff;--bnws3pd: #e0e7ff;--bnws3pe: #c7d2fe;--bnws3pf: #a5b4fc;--bnws3pg: #818cf8;--bnws3ph: #6366f1;--bnws3pi: #4f46e5;--bnws3pj: #4338ca;--bnws3pk: #3730a3;--bnws3pl: #312e81;--bnws3pm: #ccfbf1;--bnws3pn: #14b8a6;--bnws3po: #0d9488;--bnws3pp: #0f766e;--bnws3pq: #f59e0b;--bnws3pr: #fee2e2;--bnws3ps: #dc2626;--bnws3pt: #b91c1c;--bnws3pu: #991b1b;--bnws3pv: \"Inter\", \"ui-sans-serif\", \"system-ui\", \"-apple-system\", \"BlinkMacSystemFont\", \"Segoe UI\", \"Roboto\", \"Helvetica Neue\", \"Arial\", \"Noto Sans\", \"sans-serif\", \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";--bnws3pw: 16px;--bnws3px: .75rem;--bnws3py: .875rem;--bnws3pz: 1rem;--bnws3p10: 1.25rem;--bnws3p11: 1.5rem;--bnws3p12: 2rem;--bnws3p13: 400;--bnws3p14: 500;--bnws3p15: 600;--bnws3p16: 700;--bnws3p17: 2px}\n._9zwehh0{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}input:checked{background-image:url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e\");border-color:transparent;background-color:currentColor;background-size:100% 100%;background-position:center;background-repeat:no-repeat}h1{font-size:2.25rem;font-weight:700;line-height:1.1111;color:var(--bnws3p9)}@media (prefers-color-scheme: dark){h1{color:var(--bnws3p3)}}\n"}],"routeData":{"route":"/profil/[slug]","type":"page","pattern":"^\\/profil\\/([^/]+?)\\/?$","segments":[[{"content":"profil","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/profil/[slug].astro","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/og.png","type":"endpoint","pattern":"^\\/api\\/og\\.png$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"og.png","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/og.png.ts","pathname":"/api/og.png","prerender":false,"_meta":{"trailingSlash":"ignore"}}}],"site":"https://azertykeycaps.fr","base":"/","compressHTML":true,"componentMetadata":[["/home/kzm/documents/personal/azertykeycaps-astro/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/home/kzm/documents/personal/azertykeycaps-astro/src/pages/informations.astro",{"propagation":"none","containsHead":true}],["/home/kzm/documents/personal/azertykeycaps-astro/src/pages/profil/[slug].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var r=(i,c,n)=>{let s=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),s();break}});for(let e of n.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astro-page-split:node_modules/astro/dist/assets/image-endpoint@_@js":"pages/entry._image.astro.mjs","\u0000@astro-page-split:src/pages/index.styles.css@_@ts":"pages/entry.index.styles.css.astro.mjs","\u0000@astro-page-split:src/pages/index@_@astro":"pages/entry.index.astro.mjs","\u0000@astro-page-split:src/pages/informations@_@astro":"pages/entry.informations.astro.mjs","\u0000@astro-page-split:src/pages/profil/[slug]@_@astro":"pages/profil/entry._slug_.astro.mjs","\u0000@astro-page-split:src/pages/api/og.png@_@ts":"pages/api/entry.og.png.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000empty-middleware":"_empty-middleware.mjs","/node_modules/astro/dist/assets/image-endpoint.js":"chunks/pages/image-endpoint_8c39d713.mjs","/src/pages/index.styles.css.ts":"chunks/pages/index_0b39ebd8.mjs","/src/pages/api/og.png.ts":"chunks/pages/og_33f08caf.mjs","\u0000@astrojs-manifest":"manifest_1ed3a984.mjs","/home/kzm/documents/personal/azertykeycaps-astro/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_297faebc.mjs","/home/kzm/documents/personal/azertykeycaps-astro/src/components/elements/Description":"_astro/Description.48868617.js","/home/kzm/documents/personal/azertykeycaps-astro/node_modules/workbox-window/build/workbox-window.prod.es5.mjs":"_astro/workbox-window.prod.es5.a7b12eab.js","/home/kzm/documents/personal/azertykeycaps-astro/src/components/elements/GoTop":"_astro/GoTop.ac22c774.js","@astrojs/preact/client.js":"_astro/client.b1890d57.js","/astro/hoisted.js?q=0":"_astro/hoisted.ec606762.js","/home/kzm/documents/personal/azertykeycaps-astro/node_modules/@preact/signals/dist/signals.module.js":"_astro/signals.module.ca0754aa.js","/home/kzm/documents/personal/azertykeycaps-astro/src/components/articles/ArticleList":"_astro/ArticleList.c434ed9a.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/logo.311ccf89.png","/_astro/_slug_.34175ed2.css","/_astro/index.0fd9929b.css","/_astro/informations.3f95d69e.css","/favicon.png","/manifest.webmanifest","/robots.txt","/sw.js","/workbox-27b29e6f.js","/_astro/ArticleList.c434ed9a.js","/_astro/Description.48868617.js","/_astro/GoTop.ac22c774.js","/_astro/client.b1890d57.js","/_astro/clsx.1229b3e0.js","/_astro/hoisted.ec606762.js","/_astro/hooks.module.b1431384.js","/_astro/jsxRuntime.module.1b1126d6.js","/_astro/preact.module.4d513d4a.js","/_astro/preload-helper.cf010ec4.js","/_astro/signals.module.ca0754aa.js","/_astro/workbox-window.prod.es5.a7b12eab.js","/fonts/Inter-Bold.woff","/fonts/Inter-Bold.woff2","/fonts/Inter-Medium.woff","/fonts/Inter-Medium.woff2","/fonts/Inter-Regular.woff","/fonts/Inter-Regular.woff2","/fonts/Inter-SemiBold.woff","/fonts/Inter-SemiBold.woff2","/fonts/OpenCherry-Regular.otf","/index.html","/informations/index.html"]});

export { AstroCookies as A, Logger as L, attachCookiesToResponse as a, callEndpoint as b, createAPIContext as c, dateTimeFormat as d, callMiddleware as e, AstroIntegrationLogger as f, getSetCookiesFromResponse as g, levels as l, manifest };
