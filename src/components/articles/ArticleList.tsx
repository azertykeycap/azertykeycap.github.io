import { useState, useEffect } from 'preact/hooks';
import Article from './Article';

import type {
  KeycapArticleType,
  ProfileContentfulInterface
} from '../../lib/contentful';

interface ArticleListProps {
  articles: Partial<Record<string, Array<KeycapArticleType>>>;
  navigationLinks: Array<ProfileContentfulInterface>;
}

export default function ArticleList(props: ArticleListProps) {
  const [checked, setChecked] = useState(false);
  const [articlesDisplay, setArticlesDisplay] = useState(props.articles);

  useEffect(() => {
    if (checked === true)
      setArticlesDisplay(
        Object.fromEntries(
          Object.entries(articlesDisplay).filter(
            ([_, v]) =>
              v && v.filter((a) => a.status === 'En stock').length !== 0
          )
        )
      );
    else setArticlesDisplay(props.articles);
  }, [checked]);

  const switchChecked = (): void => {
    setChecked(!checked);
  };

  return (
    <>
      <div class="relative flex items-center bg-white p-3">
        <div class="flex h-5 items-center">
          <input
            id="filter"
            aria-describedby="filter-description"
            name="filter"
            type="checkbox"
            checked={checked}
            onClick={switchChecked}
            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
        </div>
        <label for="filter" class="ml-4 text-slate-700">
          Voir seulement les articles en stock
        </label>
      </div>

      {Object.keys(articlesDisplay)
        .sort()
        .map((a, i) => (
          <>
            <section
              id={props.navigationLinks.find((n) => a === n.title)?.slug}
            >
              <h3 class={'mt-10 mb-8 text-2xl font-semibold dark:text-white'}>
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
