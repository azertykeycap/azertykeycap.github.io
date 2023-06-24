import { useState, useEffect, useMemo } from 'preact/hooks';
import { Image } from '@unpic/preact';

import { styles } from './styles.css';

import Article from '../Article';
import Checkbox from '../../elements/Checkbox';
import Apagnan from '../../../assets/apagnan.webp';

import type { KeycapArticleContentfulInterface } from '../../../lib/contentful';

interface ArticleListProps {
  articles: Array<KeycapArticleContentfulInterface>;
  profile: {
    title: string;
    slug: string;
    description?: string;
    abbreviation: string;
  };
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
    <section itemScope itemType="https://schema.org/ProductCollection">
      <meta itemProp="name" content={props.profile.title} />
      {props.profile.description && (
        <meta itemProp="description" content={props.profile.description} />
      )}
      <meta
        itemProp="collectionSize"
        content={sortedArticles.length.toString()}
      />
      <header className={styles.header.base}>
        <div className={styles.header.div}>
          <h1 itemProp="name">{props.profile.title}</h1>
          <div className={styles.header.checkbox.container}>
            <Checkbox
              variant="primary"
              checked={checked}
              onClick={switchChecked}
            />
          </div>
        </div>
        {props.profile.description && (
          <p itemProp="description" className={styles.header.p}>
            {props.profile.description}
          </p>
        )}
      </header>
      {sortedArticles.length > 0 ? (
        <section className={styles.section.base}>
          <div className={styles.section.grid}>
            {sortedArticles.map((article, i) => (
              <Article key={i} article={article} isHighPriority={i < 4} />
            ))}
          </div>
        </section>
      ) : (
        <div className={styles.results.noresults}>
          <Image
            src={(Apagnan as unknown as MediaImage).src}
            width={48}
            height={48}
          />
          Aucun article disponible...
        </div>
      )}
    </section>
  );
}
