import { Fragment, type JSX } from 'preact/jsx-runtime';
import { styles } from './styles.css';

interface DescriptionProps {
  input: string;
}

export default function Description(props: DescriptionProps): JSX.Element {
  const lines = props.input.split('\n');

  return (
    <p className={styles?.description}>
      {lines.map((line, index) => (
        <Fragment key={index}>
          {line}
          {index !== lines.length - 1 && <br />}
        </Fragment>
      ))}
    </p>
  );
}
