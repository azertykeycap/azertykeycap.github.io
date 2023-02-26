import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'experimental-edge'
};

export default async function handler(req) {
  try {
    const html = {
      type: 'div',
      props: {
        children: [
          {
            type: 'div',
            props: {
              children: [
                {
                  type: 'p',
                  props: {
                    style: { fontSize: 64 },
                    children: 'title test'
                  }
                }
              ]
            }
          }
        ]
      }
    };

    return new ImageResponse(html, {
      width: 1200,
      height: 630
    });
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500
    });
  }
}
