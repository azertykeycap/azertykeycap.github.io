/* empty css                           */import { A as AstroError, E as ExpectedImage, L as LocalImageUsedWrongly, M as MissingImageDimension, U as UnsupportedImageFormat, I as InvalidImageService, a as ExpectedImageOptions, c as createAstro, b as createComponent, d as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, e as addAttribute, s as spreadAttributes, f as renderComponent, F as Fragment, u as unescapeHTML, g as renderHead, h as renderSlot } from '../astro_732cf17d.mjs';
import clsx$1, { clsx } from 'clsx';
/* empty css                            *//* empty css                            */import contentful from 'contentful';
import { capitalize } from 'radash';
import { useState, useMemo, useEffect } from 'preact/hooks';
import { Image } from '@unpic/preact';
/* empty css                            */import { jsxs, jsx, Fragment as Fragment$1 } from 'preact/jsx-runtime';

function prependForwardSlash(path) {
  return path[0] === "/" ? path : "/" + path;
}
function collapseDuplicateSlashes(path) {
  return path.replace(/(?<!:)\/\/+/g, "/");
}
function removeTrailingForwardSlash(path) {
  return path.endsWith("/") ? path.slice(0, path.length - 1) : path;
}
function removeLeadingForwardSlash(path) {
  return path.startsWith("/") ? path.substring(1) : path;
}
function trimSlashes(path) {
  return path.replace(/^\/|\/$/g, "");
}
function isString(path) {
  return typeof path === "string" || path instanceof String;
}
function joinPaths(...paths) {
  return paths.filter(isString).map((path, i) => {
    if (i === 0) {
      return removeTrailingForwardSlash(path);
    } else if (i === paths.length - 1) {
      return removeLeadingForwardSlash(path);
    } else {
      return trimSlashes(path);
    }
  }).join("/");
}
function isRemotePath(src) {
  return /^(http|ftp|https|ws):?\/\//.test(src) || src.startsWith("data:");
}
function slash(path) {
  return path.replace(/\\/g, "/");
}

const VALID_SUPPORTED_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg"
];

function isLocalService(service) {
  if (!service) {
    return false;
  }
  return "transform" in service;
}
function parseQuality(quality) {
  let result = parseInt(quality);
  if (Number.isNaN(result)) {
    return quality;
  }
  return result;
}
const baseService = {
  validateOptions(options) {
    if (!options.src || typeof options.src !== "string" && typeof options.src !== "object") {
      throw new AstroError({
        ...ExpectedImage,
        message: ExpectedImage.message(JSON.stringify(options.src))
      });
    }
    if (!isESMImportedImage(options.src)) {
      if (options.src.startsWith("/@fs/")) {
        throw new AstroError({
          ...LocalImageUsedWrongly,
          message: LocalImageUsedWrongly.message(options.src)
        });
      }
      let missingDimension;
      if (!options.width && !options.height) {
        missingDimension = "both";
      } else if (!options.width && options.height) {
        missingDimension = "width";
      } else if (options.width && !options.height) {
        missingDimension = "height";
      }
      if (missingDimension) {
        throw new AstroError({
          ...MissingImageDimension,
          message: MissingImageDimension.message(missingDimension, options.src)
        });
      }
    } else {
      if (!VALID_SUPPORTED_FORMATS.includes(options.src.format)) {
        throw new AstroError({
          ...UnsupportedImageFormat,
          message: UnsupportedImageFormat.message(
            options.src.format,
            options.src.src,
            VALID_SUPPORTED_FORMATS
          )
        });
      }
      if (options.src.format === "svg") {
        options.format = "svg";
      }
    }
    if (!options.format) {
      options.format = "webp";
    }
    return options;
  },
  getHTMLAttributes(options) {
    let targetWidth = options.width;
    let targetHeight = options.height;
    if (isESMImportedImage(options.src)) {
      const aspectRatio = options.src.width / options.src.height;
      if (targetHeight && !targetWidth) {
        targetWidth = Math.round(targetHeight * aspectRatio);
      } else if (targetWidth && !targetHeight) {
        targetHeight = Math.round(targetWidth / aspectRatio);
      } else if (!targetWidth && !targetHeight) {
        targetWidth = options.src.width;
        targetHeight = options.src.height;
      }
    }
    const { src, width, height, format, quality, ...attributes } = options;
    return {
      ...attributes,
      width: targetWidth,
      height: targetHeight,
      loading: attributes.loading ?? "lazy",
      decoding: attributes.decoding ?? "async"
    };
  },
  getURL(options, imageConfig) {
    const searchParams = new URLSearchParams();
    if (isESMImportedImage(options.src)) {
      searchParams.append("href", options.src.src);
    } else if (isRemoteAllowed(options.src, imageConfig)) {
      searchParams.append("href", options.src);
    } else {
      return options.src;
    }
    const params = {
      w: "width",
      h: "height",
      q: "quality",
      f: "format"
    };
    Object.entries(params).forEach(([param, key]) => {
      options[key] && searchParams.append(param, options[key].toString());
    });
    const imageEndpoint = joinPaths("/", "/_image");
    return `${imageEndpoint}?${searchParams}`;
  },
  parseURL(url) {
    const params = url.searchParams;
    if (!params.has("href")) {
      return void 0;
    }
    const transform = {
      src: params.get("href"),
      width: params.has("w") ? parseInt(params.get("w")) : void 0,
      height: params.has("h") ? parseInt(params.get("h")) : void 0,
      format: params.get("f"),
      quality: params.get("q")
    };
    return transform;
  }
};

function matchPattern(url, remotePattern) {
  return matchProtocol(url, remotePattern.protocol) && matchHostname(url, remotePattern.hostname, true) && matchPort(url, remotePattern.port) && matchPathname(url, remotePattern.pathname, true);
}
function matchPort(url, port) {
  return !port || port === url.port;
}
function matchProtocol(url, protocol) {
  return !protocol || protocol === url.protocol.slice(0, -1);
}
function matchHostname(url, hostname, allowWildcard) {
  if (!hostname) {
    return true;
  } else if (!allowWildcard || !hostname.startsWith("*")) {
    return hostname === url.hostname;
  } else if (hostname.startsWith("**.")) {
    const slicedHostname = hostname.slice(2);
    return slicedHostname !== url.hostname && url.hostname.endsWith(slicedHostname);
  } else if (hostname.startsWith("*.")) {
    const slicedHostname = hostname.slice(1);
    const additionalSubdomains = url.hostname.replace(slicedHostname, "").split(".").filter(Boolean);
    return additionalSubdomains.length === 1;
  }
  return false;
}
function matchPathname(url, pathname, allowWildcard) {
  if (!pathname) {
    return true;
  } else if (!allowWildcard || !pathname.endsWith("*")) {
    return pathname === url.pathname;
  } else if (pathname.endsWith("/**")) {
    const slicedPathname = pathname.slice(0, -2);
    return slicedPathname !== url.pathname && url.pathname.startsWith(slicedPathname);
  } else if (pathname.endsWith("/*")) {
    const slicedPathname = pathname.slice(0, -1);
    const additionalPathChunks = url.pathname.replace(slicedPathname, "").split("/").filter(Boolean);
    return additionalPathChunks.length === 1;
  }
  return false;
}

function isESMImportedImage(src) {
  return typeof src === "object";
}
function isRemoteImage(src) {
  return typeof src === "string";
}
function isRemoteAllowed(src, {
  domains = [],
  remotePatterns = []
}) {
  if (!isRemotePath(src))
    return false;
  const url = new URL(src);
  return domains.some((domain) => matchHostname(url, domain)) || remotePatterns.some((remotePattern) => matchPattern(url, remotePattern));
}
async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '../sharp_297faebc.mjs'
    ).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: typeof options.src === "object" && "then" in options.src ? (await options.src).default : options.src
  };
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && // If `getURL` returned the same URL as the user provided, it means the service doesn't need to do anything
  !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    imageURL = globalThis.astroAsset.addStaticImage(validatedOptions);
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    attributes: service.getHTMLAttributes !== void 0 ? service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$5 = createAstro("https://azertykeycaps.fr");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(image.attributes)}>`;
}, "/home/kzm/documents/personal/azertykeycaps-astro/node_modules/astro/components/Image.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					const getImage = async (options) => await getImage$1(options, imageConfig);

var styles$6 = {
  section: {
    base: "_1mxdrog1 _1mxdrog0",
    div: "_1mxdrog2 _1mxdrog0",
    a: "_1mxdrog3",
    svg: "_1mxdrog4"
  }
};

const contentfulClient = contentful.createClient({
  environment: "master",
  space: "qakt0a0bvnxp",
  accessToken: "aSof-mFE0bPplXIsXKgoNHY0j3ijubQnrEQmoqNtOU0",
  host: "cdn.contentful.com"
});
const getNavigationLinks = async () => {
  const navigationLinksEntries = await contentfulClient.getEntries({
    content_type: "keycaps-profile",
    order: ["fields.title"]
  });
  return navigationLinksEntries.items.map(({
    fields
  }) => {
    const {
      title,
      slug,
      abbreviation
    } = fields;
    return {
      title,
      slug,
      abbreviation
    };
  });
};
const getHomePageInformation = async () => {
  const {
    items
  } = await contentfulClient.getEntries({
    content_type: "homepage",
    limit: 1
  });
  const homePageContent = {
    title: items[0].fields.title,
    description: items[0].fields.description,
    profileCards: items[0].fields.profileCards.map(({
      fields
    }) => ({
      title: fields.title,
      slug: fields.slug,
      description: fields.description,
      abbreviation: fields.abbreviation,
      thumbnail: fields.thumbnail?.fields.file.url
    }))
  };
  return homePageContent;
};
const getArticles = async () => {
  const articlesEntries = await contentfulClient.getEntries({
    content_type: "article"
  });
  return articlesEntries.items.map(({
    fields
  }) => {
    const {
      title,
      img,
      slug,
      profile,
      material,
      description,
      status,
      startDate,
      endDate,
      url,
      additionalUrl,
      warningText,
      isNew
    } = fields;
    return {
      title,
      img: img.fields.file?.url,
      slug,
      profile: {
        title: profile.fields?.title,
        slug: profile.fields?.slug,
        description: profile.fields?.description,
        abbreviation: profile.fields?.abbreviation
      },
      material,
      description,
      status,
      startDate: startDate ? new Date(startDate).toLocaleDateString("fr-FR") : void 0,
      endDate: endDate ? new Date(endDate).toLocaleDateString("fr-FR") : void 0,
      url,
      additionalUrl,
      warningText,
      isNew
    };
  });
};

const DiscordIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"\n>\n    <rect x=\"0\" y=\"0\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"none\"\n    ></rect>\n    <path\n        fill=\"currentColor\"\n        d=\"M10.076 11c.6 0 1.086.45 1.075 1c0 .55-.474 1-1.075 1C9.486 13 9 12.55 9 12s.475-1 1.076-1zm3.848 0c.601 0 1.076.45 1.076 1s-.475 1-1.076 1c-.59 0-1.075-.45-1.075-1s.474-1 1.075-1zm4.967-9C20.054 2 21 2.966 21 4.163V23l-2.211-1.995l-1.245-1.176l-1.317-1.25l.546 1.943H5.109C3.946 20.522 3 19.556 3 18.359V4.163C3 2.966 3.946 2 5.109 2H18.89zm-3.97 13.713c2.273-.073 3.148-1.596 3.148-1.596c0-3.381-1.482-6.122-1.482-6.122c-1.48-1.133-2.89-1.102-2.89-1.102l-.144.168c1.749.546 2.561 1.334 2.561 1.334a8.263 8.263 0 0 0-3.096-1.008a8.527 8.527 0 0 0-2.077.02c-.062 0-.114.011-.175.021c-.36.032-1.235.168-2.335.662c-.38.178-.607.305-.607.305s.854-.83 2.705-1.376l-.103-.126s-1.409-.031-2.89 1.103c0 0-1.481 2.74-1.481 6.121c0 0 .864 1.522 3.137 1.596c0 0 .38-.472.69-.871c-1.307-.4-1.8-1.24-1.8-1.24s.102.074.287.179c.01.01.02.021.041.031c.031.022.062.032.093.053c.257.147.514.262.75.357c.422.168.926.336 1.513.452a7.06 7.06 0 0 0 2.664.01a6.666 6.666 0 0 0 1.491-.451c.36-.137.761-.337 1.183-.62c0 0-.514.861-1.862 1.25c.309.399.68.85.68.85z\"\n    ></path>\n</svg>";

const GithubIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"\n>\n    <rect x=\"0\" y=\"0\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"none\"\n    ></rect>\n    <path\n        fill=\"currentColor\"\n        d=\"M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.338 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.688c-.1-.25-.45-1.275.1-2.65c0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337c1.912-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z\"\n    ></path>\n</svg>";

const InstagramIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"\n>\n    <rect x=\"0\" y=\"0\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"none\"\n    ></rect>\n    <path\n        fill=\"currentColor\"\n        d=\"M12 2c2.717 0 3.056.01 4.122.06c1.065.05 1.79.217 2.428.465c.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.047 1.066.06 1.405.06 4.122c0 2.717-.01 3.056-.06 4.122c-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772a4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465c-1.066.047-1.405.06-4.122.06c-2.717 0-3.056-.01-4.122-.06c-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153a4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122c.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10a5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0a1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6a3 3 0 0 1 0-6z\"\n    ></path>\n</svg>";

const TwitterIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"\n>\n    <rect x=\"0\" y=\"0\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"none\"\n    ></rect>\n    <path\n        fill=\"currentColor\"\n        d=\"M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814a11.874 11.874 0 0 1-8.62-4.37a4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101a4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732a11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9c0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z\"\n    ></path>\n</svg>";

const WebsiteIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"\n>\n    <rect x=\"0\" y=\"0\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"none\"\n    ></rect>\n    <path\n        fill=\"currentColor\"\n        d=\"M2.05 13h5.477a17.9 17.9 0 0 0 2.925 8.88A10.005 10.005 0 0 1 2.05 13zm0-2a10.005 10.005 0 0 1 8.402-8.88A17.9 17.9 0 0 0 7.527 11H2.05zm19.9 0h-5.477a17.9 17.9 0 0 0-2.925-8.88A10.005 10.005 0 0 1 21.95 11zm0 2a10.005 10.005 0 0 1-8.402 8.88A17.9 17.9 0 0 0 16.473 13h5.478zM9.53 13h4.94A15.908 15.908 0 0 1 12 20.592A15.908 15.908 0 0 1 9.53 13zm0-2A15.908 15.908 0 0 1 12 3.408A15.908 15.908 0 0 1 14.47 11H9.53z\"\n    ></path>\n</svg>";

const $$Astro$4 = createAstro("https://azertykeycaps.fr");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Index;
  const socialLinksEntries = await contentfulClient.getEntries({
    content_type: "socialNetwork"
  });
  const socialLinks = socialLinksEntries.items.map(
    (n) => {
      const { title, url } = n.fields;
      return { title, url };
    }
  );
  const iconMapping = [
    {
      title: "discord",
      icon: DiscordIcon
    },
    {
      title: "github",
      icon: GithubIcon
    },
    {
      title: "instagram",
      icon: InstagramIcon
    },
    {
      title: "twitter",
      icon: TwitterIcon
    },
    {
      title: "website",
      icon: WebsiteIcon
    }
  ];
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(styles$6.section.base, "class")}><a href="/informations/"${addAttribute(styles$6.section.a, "class")}>Informations</a><div${addAttribute(styles$6.section.div, "class")}>${socialLinks.map((s) => {
    const correspondingImage = iconMapping.find(
      (i) => i.title.includes(s.title)
    );
    return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${correspondingImage && renderTemplate`<a${addAttribute(s.url, "href")} target="_blank"${addAttribute(`${capitalize(s.title)} link`, "aria-label")}><div${addAttribute(styles$6.section.svg, "class")}>${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate`${unescapeHTML(correspondingImage.icon)}` })}</div></a>`}` })}`;
  })}</div></section>`;
}, "/home/kzm/documents/personal/azertykeycaps-astro/src/components/elements/Socials/index.astro", void 0);

const Logo = {"src":"/_astro/logo.311ccf89.png","width":48,"height":48,"format":"png"};

var NavigationLayoutEnum = /* @__PURE__ */ ((NavigationLayoutEnum2) => {
  NavigationLayoutEnum2["MAIN"] = "main";
  NavigationLayoutEnum2["SECONDARY"] = "secondary";
  return NavigationLayoutEnum2;
})(NavigationLayoutEnum || {});

var styles$5 = {
  img: "_1g6gcyq0",
  header: {
    base: "_1g6gcyq1",
    section: "_1g6gcyq2",
    nav: {
      base: "_1g6gcyq3",
      desktop: {
        base: "_1g6gcyq4"
      },
      mobile: {
        base: "_1g6gcyq5"
      },
      div: "_1g6gcyq6",
      button: {
        base: "_1g6gcyq7"
      },
      span: "_9zwehh0"
    },
    svg: "_1g6gcyq8",
    mobile: {
      button: "_1g6gcyq9",
      nav: {
        base: "_1g6gcyqa",
        div: "_1g6gcyqb"
      }
    }
  },
  common: {
    ul: {
      base: "_1g6gcyqc",
      mobile: {
        base: "_1g6gcyqd"
      },
      li: "_1g6gcyqe"
    },
    a: "_1g6gcyqf"
  }
};

var srOnly = "_9zwehh0";

const $$Astro$3 = createAstro("https://azertykeycaps.fr");
const $$Navigation = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Navigation;
  const { layout, navigationLinks } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(styles$5.header.section, "class")}><nav${addAttribute(clsx(`${styles$5.header.nav.desktop.base} ${styles$5.header.nav.base}`), "class")}><div${addAttribute(styles$5.header.nav.div, "class")}><a${addAttribute(styles$5.common.a, "class")}${addAttribute("/", "href")}><span${addAttribute(srOnly, "class")}>PLAKET INDUSTRIES</span>${renderComponent($$result, "Image", $$Image, { "src": Logo, "width": 48, "height": 48, "alt": "Author logo", "class": styles$5.img, "loading": "eager", "fetchpriority": "high" })}</a>${layout === NavigationLayoutEnum.MAIN && navigationLinks && renderTemplate`<ul${addAttribute(styles$5.common.ul.base, "class")}>${navigationLinks.map((n) => renderTemplate`<li${addAttribute(styles$5.common.ul.li, "class")}${addAttribute(`Navigation link click - ${n.title}`, "data-umami-event")}${addAttribute(n.title, "data-umami-event-title")}><a${addAttribute(`/profil/${n.slug}`, "href")}${addAttribute(styles$5.common.a, "class")} rel="noopener">${n.abbreviation}</a></li>`)}</ul>`}<section id="btn-open"${addAttribute(styles$5.header.nav.mobile.base, "class")}><button type="button" aria-expanded="false"${addAttribute(styles$5.header.nav.button.base, "class")}><span${addAttribute(srOnly, "class")}>Open main menu</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"${addAttribute(styles$5.header.svg, "class")}><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path></svg></button></section></div><div${addAttribute(styles$5.header.nav.div, "class")}>${renderComponent($$result, "Socials", $$Index, {})}</div></nav></section><section id="mobile-menu"${addAttribute(clsx(`hidden ${styles$5.header.section}`), "class")}><nav${addAttribute(styles$5.header.mobile.nav.base, "class")}><div${addAttribute(`${styles$5.header.mobile.nav.div} ${styles$5.header.nav.div}`, "class")}>${renderComponent($$result, "Image", $$Image, { "src": Logo, "width": 48, "height": 48, "alt": "Author logo", "class": styles$5.img, "loading": "eager" })}<button type="button" id="btn-close"${addAttribute(styles$5.header.mobile.button, "class")}><span${addAttribute(srOnly, "class")}>Close menu</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true"${addAttribute(styles$5.header.svg, "class")}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>${layout === NavigationLayoutEnum.MAIN && navigationLinks && renderTemplate`<ul id="mobile-ul"${addAttribute(styles$5.common.ul.mobile.base, "class")}>${navigationLinks.map((n) => renderTemplate`<li${addAttribute(styles$5.common.ul.li, "class")}><a${addAttribute(`/profil/${n.slug}`, "href")}${addAttribute(styles$5.common.a, "class")}>${n.title}</a></li>`)}</ul>`}${layout !== NavigationLayoutEnum.MAIN && renderTemplate`<a href="/">Accueil</a>`}${renderComponent($$result, "Socials", $$Index, {})}</nav></section>`;
}, "/home/kzm/documents/personal/azertykeycaps-astro/src/components/core/Navigation/Navigation.astro", void 0);

var styles$4 = {
  layout: {
    main: "_1pxbu3f0"
  }
};

function JsonLd(item, space) {
  return JSON.stringify(item, safeJsonLdReplacer, space);
}
const ESCAPE_ENTITIES = Object.freeze({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;"
});
const ESCAPE_REGEX = new RegExp(
  `[${Object.keys(ESCAPE_ENTITIES).join("")}]`,
  "g"
);
const ESCAPE_REPLACER = (t) => ESCAPE_ENTITIES[t];
const safeJsonLdReplacer = (() => {
  return (_, value) => {
    switch (typeof value) {
      case "object":
        if (value === null) {
          return void 0;
        }
        return value;
      case "number":
      case "boolean":
      case "bigint":
        return value;
      case "string":
        return value.replace(ESCAPE_REGEX, ESCAPE_REPLACER);
      default: {
        return void 0;
      }
    }
  };
})();

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$2 = createAstro("https://azertykeycaps.fr");
const $$Schema = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Schema;
  const { item, space } = Astro2.props;
  return renderTemplate(_a$1 || (_a$1 = __template$1(['<script type="application/ld+json">', "<\/script>"])), unescapeHTML(JsonLd(item, space)));
}, "/home/kzm/documents/personal/azertykeycaps-astro/node_modules/astro-seo-schema/dist/Schema.astro", void 0);

const pwaInfo = {"pwaInDevEnvironment":false,"webManifest":{"href":"/manifest.webmanifest","useCredentials":false,"linkTag":"<link rel=\"manifest\" href=\"/manifest.webmanifest\">"}};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro("https://azertykeycaps.fr");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const defaultDescription = "Azertykeycaps est un site communautaire r\xE9pertoriant les derniers keysets poss\xE9dant une compatibilit\xE9 AZERTY (ou ISO-FR) dans le hobby des claviers m\xE9caniques.";
  const { title, description, layout, navigationLinks, additionalSeoInfo } = Astro2.props;
  return renderTemplate`<html lang="fr"><head><meta charset="UTF-8">${renderTemplate(_a || (_a = __template(['<script async src="https://analytics.azertykeycaps.fr/script.js" data-website-id="767b5e54-5d36-4f30-b703-9f42086dfbc7"><\/script>'])))}${additionalSeoInfo?.articles && additionalSeoInfo?.articles?.length > 0 && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${additionalSeoInfo.articles.map((a) => renderTemplate`${renderComponent($$result2, "Schema", $$Schema, { "item": {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${a.title}`,
    image: `${a.img}`,
    url: `${a.url}`,
    brand: {
      "@type": "Organization",
      name: `${a.profile.title}`
    },
    material: `${a.material}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "0"
    }
  } })}`)}` })}`}<meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description"${addAttribute(description ? description : defaultDescription, "content")}><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta property="og:site_name" content="Azerty Keycaps"><meta property="og:image"${addAttribute(`/api/og.png`, "content")}><meta name="twitter:image"${addAttribute(`/api/og.png`, "content")}><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:type" content="website"><meta property="og:title" content="Azerty Keycaps - Annuaire de keycaps françaises"><meta property="og:description"${addAttribute(description ? description : defaultDescription, "content")}><meta property="og:locale" content="fr_FR"><meta name="twitter:card" content="summary_large_image"><meta property="twitter:domain"${addAttribute(Astro2.site, "content")}><meta property="twitter:url"${addAttribute(Astro2.site, "content")}><meta name="twitter:title" content="Azerty Keycaps - Annuaire de keycaps françaises"><meta name="twitter:description"${addAttribute(description ? description : defaultDescription, "content")}><link rel="icon" type="image/x-icon" href="/favicon.png"><link rel="sitemap" href="/sitemap-index.xml"><link rel="canonical"${addAttribute(`${Astro2.site}${additionalSeoInfo && additionalSeoInfo.canonical ? additionalSeoInfo.canonical : ""}`, "href")}><link rel="mask-icon" href="/favicon.svg" color="#FFFFFF"><meta name="msapplication-TileColor" content="#FFFFFF"><meta name="theme-color" content="#ffffff">${pwaInfo && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(pwaInfo.webManifest.linkTag)}` })}`}<title>Azerty Keycaps - ${title}</title>${renderHead()}</head><body>${renderComponent($$result, "Navigation", $$Navigation, { "layout": layout, "navigationLinks": navigationLinks })}<main${addAttribute(styles$4.layout.main, "class")}>${renderSlot($$result, $$slots["main"])}${renderSlot($$result, $$slots["goto"])}</main></body></html>`;
}, "/home/kzm/documents/personal/azertykeycaps-astro/src/layouts/Layout.astro", void 0);

var styles$3 = {
  section: {
    base: "_7lvmih4",
    title: "_7lvmih5",
    grid: "_7lvmih6"
  },
  header: {
    base: "_7lvmih0",
    div: "_7lvmih1",
    checkbox: {
      container: "_7lvmih2"
    },
    p: "_7lvmih3"
  },
  results: {
    noresults: "_7lvmih7"
  }
};

var styles$2 = {
  article: {
    normal: "_4s4g706 _4s4g705",
    "new": "_4s4g707 _4s4g705",
    content: {
      img: "_4s4g708",
      description: {
        h2: "_4s4g709",
        section: "_4s4g70a",
        dl: {
          base: "_4s4g70b",
          dt: "_4s4g70c",
          dd: "_4s4g70d",
          status: {
            dd: "_4s4g70e"
          },
          warning: {
            span: "_4s4g70f"
          },
          additionnalUrl: {
            div: "_4s4g70g",
            button: {
              primary: "_4s4g70h _4s4g700",
              secondary: "_4s4g70i _4s4g700"
            }
          }
        }
      }
    }
  },
  hr: "_4s4g701",
  newBadge: {
    div: "_4s4g702",
    svg: "_4s4g703",
    span: "_4s4g704"
  }
};

function Article(props) {
  const {
    article,
    isHighPriority
  } = props;
  const {
    img,
    profile,
    startDate,
    endDate,
    title,
    material,
    status,
    description,
    warningText,
    url,
    additionalUrl,
    isNew
  } = article;
  return jsxs("article", {
    className: clsx(isNew ? styles$2.article.new : styles$2.article.normal),
    itemScope: true,
    itemType: "https://schema.org/Product",
    children: [jsx("meta", {
      itemProp: "name",
      content: title
    }), jsx("meta", {
      itemProp: "description",
      content: description
    }), jsx("meta", {
      itemProp: "url",
      content: url
    }), jsx("meta", {
      itemProp: "image",
      content: img
    }), jsx("meta", {
      itemProp: "material",
      content: material
    }), jsx("meta", {
      itemProp: "brand",
      content: profile.abbreviation
    }), profile && jsx("meta", {
      itemProp: "category",
      content: profile.abbreviation
    }), startDate && endDate && jsx("meta", {
      itemProp: "releaseDate",
      content: `${startDate} - ${endDate}`
    }), warningText && jsx("meta", {
      itemProp: "negativeNotes",
      content: warningText
    }), isNew && jsxs("div", {
      className: styles$2.newBadge.div,
      children: [jsx("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        className: styles$2.newBadge.svg,
        children: jsx("path", {
          "fill-rule": "evenodd",
          d: "M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z",
          "clip-rule": "evenodd"
        })
      }), jsx("span", {
        className: styles$2.newBadge.span,
        children: "Nouveau"
      })]
    }), jsx(Image, {
      src: `https://${img}?fit=fill&w=560&h=370&fm=webp&q=70`,
      alt: title,
      loading: isHighPriority ? "eager" : "lazy",
      decoding: isHighPriority ? "auto" : "async",
      fetchpriority: isHighPriority ? "high" : "low",
      layout: "constrained",
      className: styles$2.article.content.img,
      itemProp: "image",
      background: "auto",
      height: 370,
      width: 560
    }), jsx("h2", {
      itemProp: "name",
      className: styles$2.article.content.description.h2,
      children: title
    }), jsx("hr", {
      className: styles$2.hr
    }), jsxs("dl", {
      className: styles$2.article.content.description.dl.base,
      children: [jsx("dt", {
        className: styles$2.article.content.description.dl.dt,
        children: "Profil :"
      }), jsx("dd", {
        className: styles$2.article.content.description.dl.dd,
        itemProp: "category",
        children: profile.title
      }), jsx("dt", {
        className: styles$2.article.content.description.dl.dt,
        children: "Material :"
      }), jsx("dd", {
        className: styles$2.article.content.description.dl.dd,
        itemProp: "material",
        children: material
      })]
    }), status && jsxs(Fragment$1, {
      children: [jsx("hr", {
        className: styles$2.hr
      }), jsxs("dl", {
        className: styles$2.article.content.description.dl.base,
        children: [jsx("dt", {
          className: styles$2.article.content.description.dl.dt,
          children: "Statut :"
        }), jsx("dd", {
          className: styles$2.article.content.description.dl.status.dd,
          itemProp: "availability",
          children: status
        })]
      }), (startDate || endDate) && jsxs(Fragment$1, {
        children: [jsx("hr", {
          className: styles$2.hr
        }), jsxs("dl", {
          className: styles$2.article.content.description.dl.base,
          itemProp: "releaseDate",
          children: [startDate && jsxs(Fragment$1, {
            children: [jsx("dt", {
              className: styles$2.article.content.description.dl.dt,
              children: "Date début :"
            }), jsx("dd", {
              className: styles$2.article.content.description.dl.dd,
              children: startDate
            })]
          }), endDate && jsxs(Fragment$1, {
            children: [jsx("dt", {
              className: styles$2.article.content.description.dl.dt,
              children: "Date fin :"
            }), jsx("dd", {
              className: styles$2.article.content.description.dl.dd,
              children: endDate
            })]
          })]
        })]
      })]
    }), description && jsxs(Fragment$1, {
      children: [jsx("hr", {
        className: styles$2.hr
      }), jsx("section", {
        itemProp: "description",
        className: styles$2.article.content.description.section,
        children: description
      })]
    }), warningText && jsxs(Fragment$1, {
      children: [jsx("hr", {
        className: styles$2.hr
      }), jsxs("span", {
        itemProp: "negativeNotes",
        className: styles$2.article.content.description.dl.warning.span,
        children: ["Attention : ", warningText]
      })]
    }), jsx("hr", {
      className: styles$2.hr
    }), jsxs("div", {
      className: styles$2.article.content.description.dl.additionnalUrl.div,
      children: [additionalUrl && jsx("a", {
        role: "button",
        href: additionalUrl,
        className: styles$2.article.content.description.dl.additionnalUrl.button.secondary,
        target: "_blank",
        onClick: () => {
          window.umami.track(`Secondary button click - ${title} - ${profile.title}`, {
            profile: profile.title,
            title,
            material,
            url,
            isNew
          });
        },
        children: "Kit secondaire"
      }), jsx("a", {
        role: "button",
        href: url,
        itemProp: "url",
        target: "_blank",
        className: styles$2.article.content.description.dl.additionnalUrl.button.primary,
        onClick: () => {
          window.umami.track(`See more button click - ${title} - ${profile.title}`, {
            profile: profile.title,
            title,
            material,
            url,
            isNew
          });
        },
        children: "En savoir +"
      })]
    })]
  });
}

var styles$1 = {
  input: {
    label: "zchukg1",
    title: "zchukg2",
    span: "zchukg3",
    styles: {
      primary: "zchukg4 zchukg0",
      secondary: "zchukg5 zchukg0"
    }
  }
};

function Checkbox({
  variant,
  checked,
  onClick
}) {
  return jsxs(Fragment$1, {
    children: [jsx("span", {
      class: styles$1.input.span,
      children: "Filtres"
    }), jsxs("label", {
      class: styles$1.input.label,
      children: [jsx("input", {
        id: "filter",
        "aria-describedby": "filter-description",
        name: "filter",
        type: "checkbox",
        checked,
        onClick,
        class: clsx$1(styles$1.input.styles[variant])
      }), "Articles en stock"]
    })]
  });
}

function ArticleList(props) {
  const [checked, setChecked] = useState(false);
  const [articlesDisplay, setArticlesDisplay] = useState(props.articles);
  const filteredArticles = useMemo(() => props.articles.filter((a) => a.status === "En stock"), [props.articles]);
  useEffect(() => {
    setArticlesDisplay(checked ? filteredArticles : props.articles);
  }, [checked, filteredArticles, props.articles]);
  const switchChecked = () => {
    setChecked(!checked);
  };
  const sortedArticles = useMemo(() => articlesDisplay.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)), [articlesDisplay]);
  return jsxs("section", {
    itemScope: true,
    itemType: "https://schema.org/ProductCollection",
    children: [jsx("meta", {
      itemProp: "name",
      content: props.profile.title
    }), props.profile.description && jsx("meta", {
      itemProp: "description",
      content: props.profile.description
    }), jsx("meta", {
      itemProp: "collectionSize",
      content: sortedArticles.length.toString()
    }), jsxs("header", {
      className: styles$3.header.base,
      children: [jsxs("div", {
        className: styles$3.header.div,
        children: [jsx("h1", {
          itemProp: "name",
          children: props.profile.title
        }), jsx("div", {
          className: styles$3.header.checkbox.container,
          children: jsx(Checkbox, {
            variant: "primary",
            checked,
            onClick: switchChecked
          })
        })]
      }), props.profile.description && jsx("p", {
        itemProp: "description",
        className: styles$3.header.p,
        children: props.profile.description
      })]
    }), sortedArticles.length > 0 ? jsx("section", {
      className: styles$3.section.base,
      children: jsx("div", {
        className: styles$3.section.grid,
        children: sortedArticles.map((article, i) => jsx(Article, {
          article,
          isHighPriority: i < 4
        }, i))
      })
    }) : jsxs("div", {
      className: styles$3.results.noresults,
      children: [jsx(Image, {
        src: Logo.src,
        width: 48,
        height: 48,
        alt: "Aucun article disponible",
        layout: "fixed"
      }), "Aucun article disponible..."]
    })]
  });
}

var styles = {
  button: {
    base: "_1k5yo9u0",
    svg: "_1k5yo9u1",
    hidden: "_1k5yo9u2"
  }
};

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);
  return scrollPosition;
};

function GoTop() {
  const scrollPosition = useScrollPosition();
  return jsx(Fragment$1, {
    children: jsx("button", {
      type: "button",
      "aria-label": "Go to top",
      class: clsx(styles.button.base, scrollPosition < 300 && styles.button.hidden),
      onClick: () => window.scrollTo({
        top: 0,
        behavior: "smooth"
      }),
      children: jsx("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        "stroke-width": "1.5",
        stroke: "currentColor",
        class: styles.button.svg,
        children: jsx("path", {
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          d: "M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
        })
      })
    })
  });
}

const $$Astro = createAstro("https://azertykeycaps.fr");
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const navigationLinks = await getNavigationLinks();
  const articles = await getArticles();
  const { slug } = Astro2.params;
  const articlesByProfile = articles.filter((a) => a.profile.slug === slug);
  const profile = articlesByProfile[0].profile;
  Astro2.response.headers.set(
    "Cache-Control",
    "public, max-age=0, s-maxage=3600, stale-while-revalidate=5400"
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "layout": NavigationLayoutEnum.MAIN, "navigationLinks": navigationLinks, "title": profile.title, "description": profile.description, "additionalSeoInfo": {
    canonical: `profil/${profile.slug}`,
    articles: articlesByProfile
  } }, { "goto": ($$result2) => renderTemplate`${renderComponent($$result2, "GoTop", GoTop, { "slot": "goto", "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/kzm/documents/personal/azertykeycaps-astro/src/components/elements/GoTop", "client:component-export": "default" })}`, "main": ($$result2) => renderTemplate`${renderComponent($$result2, "ArticleList", ArticleList, { "slot": "main", "articles": articlesByProfile, "profile": profile, "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/kzm/documents/personal/azertykeycaps-astro/src/components/articles/ArticleList", "client:component-export": "default" })}` })}`;
}, "/home/kzm/documents/personal/azertykeycaps-astro/src/pages/profil/[slug].astro", void 0);

const $$file = "/home/kzm/documents/personal/azertykeycaps-astro/src/pages/profil/[slug].astro";
const $$url = "/profil/[slug]";

const _slug_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Image as $, NavigationLayoutEnum as N, _slug_ as _, isRemotePath as a, isRemoteAllowed as b, contentfulClient as c, getNavigationLinks as d, getHomePageInformation as e, $$Layout as f, getConfiguredImageService as g, collapseDuplicateSlashes as h, imageConfig as i, joinPaths as j, baseService as k, parseQuality as l, prependForwardSlash as p, removeTrailingForwardSlash as r, slash as s, trimSlashes as t };
