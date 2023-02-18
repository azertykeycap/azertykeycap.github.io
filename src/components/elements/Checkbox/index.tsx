import { styles } from './styles.css';

interface CheckboxProps {
  checked: boolean;
  variant: keyof typeof styles.inputStyles;
  onClick: () => void;
}

export default function Checkbox({ variant, checked, onClick }: CheckboxProps) {
  return (
    <>
      <span class={styles.inputSpan}>Filtres</span>
      <div class={styles.inputLabel} onClick={onClick}>
        <input
          id="filter"
          aria-describedby="filter-description"
          name="filter"
          type="checkbox"
          checked={checked}
          class={styles.inputStyles[variant]}
        />
      </div>
      <label htmlFor="filter" class={styles.inputTitle}>
        Articles en stock
      </label>
    </>
  );
}
