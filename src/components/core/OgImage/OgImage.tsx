export interface OgImageProps {
  title: string;
}

export const OgImage = ({ title }: OgImageProps) => (
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
