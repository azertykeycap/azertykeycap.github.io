import { useState, useEffect } from 'preact/hooks';
import { styles } from './styles.css';

import Article from '../Article';

import type {
  KeycapArticleType,
  ProfileContentfulInterface
} from '../../../lib/contentful';
import Checkbox from '../../elements/Checkbox';

interface ArticleListProps {
  articles: Partial<Record<string, Array<KeycapArticleType>>>;
  navigationLinks: Array<ProfileContentfulInterface>;
}

export default function ArticleList(props: ArticleListProps) {
  const [checked, setChecked] = useState(false);
  const [articlesDisplay, setArticlesDisplay] = useState(props.articles);

  const filteredArticles = Object.fromEntries(
    Object.entries(articlesDisplay).filter(
      ([_, v]) => v && v.filter((a) => a.status === 'En stock').length !== 0
    )
  );

  useEffect(() => {
    if (checked === true) setArticlesDisplay(filteredArticles);
    else setArticlesDisplay(props.articles);
  }, [checked]);

  const switchChecked = (): void => {
    setChecked(!checked);
  };

  return (
    <>
      <section class={styles.container}>
        <Checkbox variant="primary" checked={checked} onClick={switchChecked} />
      </section>
      {Object.keys(articlesDisplay)
        .sort()
        .map((a, i) => (
          <>
            <section
              id={props.navigationLinks.find((n) => a === n.title)?.slug}
            >
              <h3 class={'mt-10 mb-12 text-2xl font-semibold dark:text-white'}>
                {a}
              </h3>
              <div
                class={
                  'grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                }
              >
                {articlesDisplay[a]
                  ?.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1))
                  ?.filter((a) => (checked ? a.status === 'En stock' : a))
                  ?.map((a, j) => (
                    <Article article={a} isHighPriority={i === 0 && j < 4} />
                  ))}
              </div>
            </section>
          </>
        ))}
    </>
  );
}
