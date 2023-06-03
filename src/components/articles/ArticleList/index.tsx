import { useState, useEffect, useMemo } from 'preact/hooks';
import { styles } from './styles.css';

import Article from '../Article';
import Checkbox from '../../elements/Checkbox';

import type {
  KeycapArticleContentfulInterface,
  ProfileContentfulInterface
} from '../../../lib/contentful';

interface ArticleListProps {
  articles: Array<KeycapArticleContentfulInterface>;
  navigationLinks: Array<ProfileContentfulInterface>;
}

export default function ArticleList(props: ArticleListProps) {
  const [checked, setChecked] = useState(false);
  const [articlesDisplay, setArticlesDisplay] = useState(props.articles);

  const filteredArticles = useMemo(
    () => props.articles.filter((a) => a.status === 'En stock'),
    [props.articles]
  );

  useEffect(() => {
    if (checked) setArticlesDisplay(filteredArticles);
    else setArticlesDisplay(props.articles);
  }, [checked, filteredArticles, props.articles]);

  const switchChecked = (): void => {
    setChecked(!checked);
  };

  const sortedArticles = useMemo(
    () =>
      articlesDisplay.sort((a, b) =>
        a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1
      ),
    [articlesDisplay]
  );

  return (
    <>
      <section className={styles.container}>
        <Checkbox variant="primary" checked={checked} onClick={switchChecked} />
      </section>
      {sortedArticles.length > 0 ? (
        <section className={styles.section.base}>
          <div className={styles.section.grid}>
            {sortedArticles.map((article, i) => (
              <Article key={i} article={article} isHighPriority={i < 4} />
            ))}
          </div>
        </section>
      ) : (
        <>Aucun article disponible</>
      )}
    </>
  );
}
