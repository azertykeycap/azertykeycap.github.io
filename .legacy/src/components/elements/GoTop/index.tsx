import { styles } from './styles.css';
import { useScrollPosition } from '../../../lib/hooks';

import { clsx } from 'clsx';

export default function GoTop() {
  const scrollPosition = useScrollPosition();

  return (
    <>
      <button
        type="button"
        aria-label="Go to top"
        class={clsx(
          styles.button.base,
          scrollPosition < 300 && styles.button.hidden
        )}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class={styles.button.svg}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
          ></path>
        </svg>
      </button>
    </>
  );
}
