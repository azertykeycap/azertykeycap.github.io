import { c as contentfulClient } from './_slug__d42d2eec.mjs';
import sharp from 'sharp';
import initYoga from 'yoga-wasm-web/asm';
import satori, { init } from 'satori/wasm';
import { jsxs, jsx } from 'preact/jsx-runtime';
import { random } from 'radash';
/* empty css                           */import '../astro_732cf17d.mjs';
import 'clsx';
import 'html-escaper';
/* empty css                            *//* empty css                            */import 'contentful';
import 'preact/hooks';
import '@unpic/preact';
/* empty css                            */
const YOGA = initYoga();
init(YOGA);
async function generateImage(Component, props, {
  width,
  height,
  debug
}) {
  const inter600 = await fetch("https://rsms.me/inter/font-files/Inter-SemiBold.woff").then((res) => res.arrayBuffer());
  const svg = await satori(Component(props), {
    debug,
    width,
    height,
    fonts: [{
      name: "Inter",
      data: inter600,
      weight: 600,
      style: "normal"
    }]
  });
  return await sharp(Buffer.from(svg)).png().toBuffer();
}

const OgImage = ({
  author,
  img
}) => {
  return jsxs("div", {
    style: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      backgroundColor: "white"
    },
    children: [jsx("img", {
      src: `https://${img}?fit=fill&w=1200&h=630&fm=jpg&q=70`,
      width: 1200,
      height: 630
    }), jsx("div", {
      style: {
        display: "flex",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderRadius: "10px",
        padding: "20px",
        position: "absolute",
        bottom: "50px",
        left: "50px"
      },
      children: jsxs("span", {
        style: {
          color: "white",
          fontSize: "36px",
          fontWeight: "semibold"
        },
        children: ["Auteur : ", author]
      })
    })]
  });
};

const OgImageNoAuthor = ({
  img
}) => {
  return jsx("div", {
    style: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      backgroundColor: "white"
    },
    children: jsx("img", {
      src: `https://${img}?fit=fill&w=1200&h=630&fm=jpg&q=70`,
      width: 1200,
      height: 630
    })
  });
};

const apiOgImageEntries = await contentfulClient.getEntries({
  content_type: "apiOgImages"
});
const ogImages = apiOgImageEntries.items.map((i) => {
  const {
    author,
    img
  } = i.fields;
  return {
    author,
    img: img.fields.file.url
  };
});
const get = async ({
  url
}) => {
  const debug = Boolean(url.searchParams.get("debug"));
  const rawWidth = url.searchParams.get("w");
  const width = rawWidth ? parseInt(rawWidth) : 1200;
  const rawHeight = url.searchParams.get("h");
  const height = rawHeight ? parseInt(rawHeight) : 630;
  const {
    author,
    img
  } = ogImages[random(0, ogImages.length - 1)];
  const args = Object.fromEntries(url.searchParams);
  const props = {
    url,
    author,
    img,
    ...args
  };
  const imageOptions = {
    width,
    height,
    debug
  };
  const buffer = await generateImage(props.author ? OgImage : OgImageNoAuthor, props, imageOptions);
  return new Response(buffer, {
    status: 200,
    headers: {
      "Cache-Control": "max-age=0",
      "Content-Type": "image/png"
    }
  });
};

export { get };
