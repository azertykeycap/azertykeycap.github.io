"use client";

import * as React from "react";
import SingleArticle from "./SingleArticle";

import type { KeycapArticleContentfulInterface } from "@/lib/api/contentful";

interface ArticleListProps {
  articles: Array<KeycapArticleContentfulInterface>;
  profile: {
    title: string;
    slug: string;
    description?: string;
    abbreviation: string;
  };
}

export default function ArticleList({ articles, profile }: ArticleListProps) {
  const [checked, setChecked] = React.useState(false);
  const [articlesDisplay, setArticlesDisplay] = React.useState(articles);

  const filteredArticles = React.useMemo(
    () => articles.filter((a) => a.status === "En stock"),
    [articles]
  );

  React.useEffect(() => {
    setArticlesDisplay(checked ? filteredArticles : articles);
  }, [checked, filteredArticles, articles]);

  const sortedArticles = React.useMemo(
    () => articlesDisplay.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)),
    [articlesDisplay]
  );
  return (
    <section itemScope itemType="https://schema.org/ProductCollection">
      <meta itemProp="name" content={profile.title} />
      {profile.description && (
        <meta itemProp="description" content={profile.description} />
      )}
      <meta
        itemProp="collectionSize"
        content={sortedArticles.length.toString()}
      />
      <h1 itemProp="name">{profile.title}</h1>
      {/* <Checkbox variant="primary" checked={checked} onClick={switchChecked} /> */}
      {profile.description && (
        <p itemProp="description">{profile.description}</p>
      )}
      {sortedArticles.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {sortedArticles.map((article, i) => (
            <SingleArticle key={i} article={article} isHighPriority={i < 4} />
          ))}
        </div>
      ) : (
        <>Aucun article disponible...</>
      )}
    </section>
  );
}
