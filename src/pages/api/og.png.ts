import type { APIRoute } from 'astro';
import { generateImage } from '../../lib/generateImage';
import { OgImage } from '../../components/core/OgImage/OgImage';

export type generateUrlOptions = Record<string, any> & {
  title: string;
};

export const generateUrl = ({ title, ...args }: generateUrlOptions) => {
  const url = new URL('/api/og.png', 'http://example.com');

  url.searchParams.append('title', title);

  Object.keys(args).forEach((arg) => {
    url.searchParams.append(arg, args[arg]);
  });

  return url.pathname + url.search;
};

export const get: APIRoute = async ({ url }) => {
  const debug = Boolean(url.searchParams.get('debug'));
  const title = url.searchParams.get('title');
  const rawWidth = url.searchParams.get('w');
  const width = rawWidth ? parseInt(rawWidth) : 1200;
  const rawHeight = url.searchParams.get('h');
  const height = rawHeight ? parseInt(rawHeight) : 630;

  if (!title) {
    return new Response(null, {
      status: 500,
      statusText: 'Title missing'
    });
  }

  const args = Object.fromEntries(url.searchParams);
  const props = { url, ...args };
  const imageOptions = { width, height, debug };
  const buffer = await generateImage(OgImage, props, imageOptions);

  return new Response(buffer, {
    status: 200,
    headers: {
      'Cache-Control': 'max-age=31536000, immutable',
      'Content-Type': 'image/png'
    }
  });
};
