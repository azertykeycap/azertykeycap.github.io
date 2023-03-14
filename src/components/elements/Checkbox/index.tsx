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
      <div class={styles.input.label} onClick={onClick}>
        <input
          id="filter"
          aria-describedby="filter-description"
          name="filter"
          type="checkbox"
          checked={checked}
          onChange={onClick}
          class={styles.input.styles[variant]}
        />
      </div>
      <label htmlFor="filter" class={styles.input.title}>
        Articles en stock
      </label>
    </>
  );
}
