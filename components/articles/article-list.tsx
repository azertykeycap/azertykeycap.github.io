"use client";

import * as React from "react";
import SingleArticle from "./article-single";

import type { KeycapArticleContentfulInterface } from "@/lib/api/contentful";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { TypographyH2 } from "../core/typography/h2";
import { cn, getStatusColor, materialList, statusList } from "@/lib/utils";

interface ArticleListProps {
  articles: Array<KeycapArticleContentfulInterface>;
}

export default function ArticleList({ articles }: ArticleListProps) {
  const [status, setStatus] = React.useState<string | undefined>(undefined);
  const [material, setMaterial] = React.useState<string | undefined>(undefined);
  const [articlesDisplay, setArticlesDisplay] = React.useState(articles);

  const filteredArticles = React.useMemo(() => {
    return articles.filter(
      (article) =>
        (!status || article.status === status) &&
        (!material || article.material === material)
    );
  }, [articles, material, status]);

  React.useEffect(() => {
    setArticlesDisplay(status || material ? filteredArticles : articles);
  }, [status, filteredArticles, articles, material]);

  const sortedArticles = React.useMemo(
    () =>
      articlesDisplay
        .slice()
        .sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)),
    [articlesDisplay]
  );

  const handleStatusChange = React.useCallback((value: string) => {
    setStatus(value);
  }, []);

  const handleMaterialChange = React.useCallback((value: string) => {
    setMaterial(value);
  }, []);
  return (
    <>
      <Separator className="my-8" />
      <div className="space-y-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Filtres :
        </h4>
        <div className="flex items-center gap-x-4">
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger
              className="w-[260px]"
              id="status"
              aria-label="select-status"
            >
              <SelectValue placeholder="Sélectionner un statut." />
            </SelectTrigger>
            <SelectContent>
              {statusList.map((s) => (
                <SelectItem key={s} value={s} className="w-full">
                  <div className="w-full flex items-center">
                    <span className="relative flex h-2 w-2 mr-3">
                      <span
                        className={cn(
                          "animate-ping absolute inline-flex h-full w-full rounded-full bg-opacity-75",
                          getStatusColor(s).bg
                        )}
                      ></span>
                      <span
                        className={cn(
                          "relative inline-flex rounded-full h-2 w-2",
                          getStatusColor(s).bg
                        )}
                      ></span>
                    </span>
                    <span>{s}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={material} onValueChange={handleMaterialChange}>
            <SelectTrigger
              className="w-[260px]"
              id="material"
              aria-label="select-material"
            >
              <SelectValue placeholder="Sélectionner une matière." />
            </SelectTrigger>
            <SelectContent>
              {materialList.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <meta
        itemProp="collectionSize"
        content={sortedArticles.length.toString()}
      />
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
        <TypographyH2 className="mt-32 mx-auto text-center">
          Aucun article disponible...
        </TypographyH2>
      )}
    </>
  );
}
