import { random } from 'radash';
import type { ApiOgImageToRender } from '../../../pages/api/og.png';

interface OgImageProps {
  author: string;
  img: string;
}

export const OgImage = ({ author, img }: OgImageProps) => {
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
      <div
        style={{
          display: 'flex',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '10px',
          padding: '20px',
          position: 'absolute',
          bottom: '50px',
          left: '50px'
        }}
      >
        <span
          style={{
            color: 'white',
            fontSize: '36px',
            fontWeight: 'semibold'
          }}
        >
          Auteur : {author}
        </span>
      </div>
    </div>
  );
};
