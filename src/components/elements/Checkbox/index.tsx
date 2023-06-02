import clsx from 'clsx';
import { styles } from './styles.css';

interface CheckboxProps {
  checked: boolean;
  variant: keyof typeof styles.input.styles;
  onClick: () => void;
}

export default function Checkbox({ variant, checked, onClick }: CheckboxProps) {
  return (
    <>
      <span class={styles.input.span}>Filtres</span>
      <input
        id="filter"
        aria-describedby="filter-description"
        name="filter"
        type="checkbox"
        checked={checked}
        onClick={onClick}
        class={clsx(styles.input.label, styles.input.styles[variant])}
      />
      <label htmlFor="filter" class={styles.input.title}>
        Articles en stock
      </label>
    </>
  );
}
