import { cn } from "@/lib/utils";
import { Image } from "@unpic/react/nextjs";
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
    <Card
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
      
      <CardHeader>
        <Image
          src={`https:${img}?fit=fill&w=560&h=370&fm=webp&q=70`}
          alt={title}
          loading={isHighPriority ? "eager" : "lazy"}
          decoding={isHighPriority ? "auto" : "async"}
          fetchpriority={isHighPriority ? "high" : "low"}
          layout="constrained"
          itemProp="image"
          height={370}
          width={560}
        />
        <CardTitle className="text-lg px-6 py-2 truncate text-center">
          {title}
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="text-sm p-0 py-4 space-y-4">
        <p className="px-6">Card Content</p>
        <Separator />
        <p className="px-6">Card Content</p>
      </CardContent>
    </Card>
  );
}
