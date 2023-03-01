interface OgImageNoAuthorProps {
  img: string;
}

export const OgImageNoAuthor = ({ img }: OgImageNoAuthorProps) => {
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
    </div>
  );
};
