"use client";

import * as React from "react";
import SingleArticle from "./article-single";

import type { KeycapArticleContentfulInterface } from "@/lib/api/contentful";
import { TypographyH1 } from "../core/typography/h1";
import { TypographyP } from "../core/typography/p";

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

      <TypographyH1 itemProp="name">{profile.title}</TypographyH1>
      {/* <Checkbox variant="primary" checked={checked} onClick={switchChecked} /> */}

      {profile.description && (
        <TypographyP itemProp="description">{profile.description}</TypographyP>
      )}

      {sortedArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
          {sortedArticles.map((article, i) => (
            <SingleArticle
              key={i}
              article={article}
              isHighPriority={i < 4}
              className="h-fit"
            />
          ))}
        </div>
      ) : (
        <>Aucun article disponible...</>
      )}
    </section>
  );
}
