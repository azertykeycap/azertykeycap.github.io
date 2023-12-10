"use client";

import * as React from "react";
import SingleArticle from "./article-single";

import type {
  KeycapArticleContentfulInterface,
  StatusType,
} from "@/lib/api/contentful";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../ui/select";
import { TypographyH2 } from "../core/typography/h2";
import { Label } from "../ui/label";

interface ArticleListProps {
  articles: Array<KeycapArticleContentfulInterface>;
}

export default function ArticleList({ articles }: ArticleListProps) {
  const [status, setStatus] = React.useState<string | undefined>(undefined);
  const [articlesDisplay, setArticlesDisplay] = React.useState(articles);

  const filteredArticles = React.useMemo(
    () => articles.filter((a) => a.status === status),
    [articles, status]
  );

  React.useEffect(() => {
    setArticlesDisplay(status ? filteredArticles : articles);
  }, [status, filteredArticles, articles]);

  const sortedArticles = React.useMemo(
    () => articlesDisplay.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)),
    [articlesDisplay]
  );

  const statusList: Array<StatusType> = [
    "En stock",
    "Extras GB",
    "Extras In-Stock",
    "GB en cours",
    "GB terminé",
    "Interest Check",
    "Out Of Stock",
  ];

  return (
    <>
      <Separator className="my-8" />
      <div className="space-y-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Filtres :
        </h4>
        <div className="flex items-center space-x-2">
          <div className="flex flex-col gap-y-2">
            {/* <Label htmlFor="status">Statut</Label> */}
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[260px]" id="status">
                <SelectValue placeholder="Sélectionner un statut." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Statuts</SelectLabel>
                  {statusList.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
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
