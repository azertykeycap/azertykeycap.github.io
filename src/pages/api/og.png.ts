import type { APIRoute } from 'astro';
import type { Asset } from 'contentful';
import { contentfulClient } from './../../lib/contentful';
import { generateImage } from '../../lib/generateImage';
import { OgImage } from '../../components/core/OgImage/OgImage';
import { OgImageNoAuthor } from '../../components/core/OgImage/OgImageNoAuthor';
import { random } from 'radash';

export type generateUrlOptions = Record<string, any> & {
  title: string;
};

export interface ApiOgImage {
  author?: string;
  img: Asset;
}

export type ApiOgImageToRender = Omit<ApiOgImage, 'img'> & {
  img: string;
};

const apiOgImageEntries = await contentfulClient.getEntries<ApiOgImage>({
  content_type: 'apiOgImages'
});

const ogImages: Array<ApiOgImageToRender> = apiOgImageEntries.items.map((i) => {
  const { author, img } = i.fields;
  return {
    author,
    img: img.fields.file.url
  };
});

export const get: APIRoute = async ({ url }) => {
  const debug = Boolean(url.searchParams.get('debug'));
  const rawWidth = url.searchParams.get('w');
  const width = rawWidth ? parseInt(rawWidth) : 1200;
  const rawHeight = url.searchParams.get('h');
  const height = rawHeight ? parseInt(rawHeight) : 630;

  const { author, img } = ogImages[random(0, ogImages.length)];

  const args = Object.fromEntries(url.searchParams);
  const props = {
    url,
    author,
    img,
    ...args
  };

  const imageOptions = { width, height, debug };
  const buffer = await generateImage(
    props.author ? OgImage : OgImageNoAuthor,
    props,
    imageOptions
  );

  return new Response(buffer, {
    status: 200,
    headers: {
      'Cache-Control': 'max-age=0',
      'Content-Type': 'image/png'
    }
  });
};
