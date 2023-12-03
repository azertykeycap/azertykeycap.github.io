"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import type { KeycapArticleContentfulInterface } from "@/lib/api/contentful";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

export interface ArticleProps {
  article: KeycapArticleContentfulInterface;
  isHighPriority: boolean;
}

export default function SingleArticle({
  article,
  isHighPriority,
}: ArticleProps) {
  const {
    img,
    profile,
    startDate,
    endDate,
    title,
    material,
    status,
    description,
    warningText,
    url,
    additionalUrl,
    isNew,
  } = article;

  return (
    <article
      className={cn(isNew ? "" : "")}
      itemScope
      itemType="https://schema.org/Product"
    >
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="url" content={url} />
      <meta itemProp="image" content={img} />
      <meta itemProp="material" content={material} />
      <meta itemProp="brand" content={profile.abbreviation} />

      {profile && <meta itemProp="category" content={profile.abbreviation} />}

      {startDate && endDate && (
        <meta itemProp="releaseDate" content={`${startDate} - ${endDate}`} />
      )}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <p>Card Content</p>
          <Separator />
          <p>Card Content</p>
        </CardContent>
      </Card>
    </article>
  );
}
