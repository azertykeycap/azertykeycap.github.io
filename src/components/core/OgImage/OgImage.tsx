export interface OgImageProps {
  title: string;
  imgSrc?: string;
}

export const OgImage = ({ title, imgSrc }: OgImageProps) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: 'white'
    }}
  >
    <img
      src={`https://${imgSrc}?fit=fill&w=1200&h=630&fm=jpg&q=70`}
      width={1200}
      height={630}
    />
    <h1
      style={{
        color: 'black',
        fontSize: '48px',
        fontweight: '500'
      }}
    >
      {title}
    </h1>
  </div>
);
