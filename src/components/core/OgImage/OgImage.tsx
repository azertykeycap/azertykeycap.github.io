import { useEffect } from 'preact/hooks';
import { random } from 'radash';
import type { ApiOgImageToRender } from '../../../pages/api/og.png';

export interface OgImageProps {
  ogImages: Array<ApiOgImageToRender>;
}

export const OgImage = ({ ogImages }: OgImageProps) => {
  const ogImageToDisplay = ogImages[random(0, ogImages.length)];
  const { userInfo, img } = ogImageToDisplay;

  console.log('ogImageToDisplay', ogImageToDisplay);

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
      }}
    >
      <img
        src={`https://${img}?fit=fill&w=1200&h=630&fm=jpg&q=70`}
        width={1200}
        height={630}
      />

      {userInfo && (
        <div
          style={{
            display: 'flex',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderRadius: '10px',
            padding: '20px',
            position: 'absolute',
            bottom: '60px',
            left: '60px'
          }}
        >
          <span
            style={{
              color: 'white',
              fontSize: '40px',
              fontWeight: 'semibold'
            }}
          >
            Author : {userInfo}
          </span>
        </div>
      )}
    </div>
  );
};
