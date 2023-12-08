import { cn } from "@/lib/utils";
import { Image } from "@unpic/react/nextjs";
import type { KeycapArticleContentfulInterface } from "@/lib/api/contentful";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import ArticleDl from "./lists/description-list";
import ArticleDt from "./lists/description-term";
import ArticleDd from "./lists/description-data";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

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
      className={cn(isNew ? "" : "", "h-fit")}
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

      {warningText && <meta itemProp="negativeNotes" content={warningText} />}

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
          className="border-b"
        />
        <CardTitle className="text-lg px-6 py-2 truncate text-center">
          {title}
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="text-sm p-0 py-4 space-y-4">
        <ArticleDl>
          <ArticleDt>Profil :</ArticleDt>
          <ArticleDd itemProp={"category"}>{profile.title}</ArticleDd>
          <ArticleDt>Material :</ArticleDt>
          <ArticleDd itemProp="material">{material}</ArticleDd>
        </ArticleDl>
        <Separator />
        <ArticleDl>
          <ArticleDt>Statut :</ArticleDt>
          <ArticleDd variant="status" itemProp={"availability"}>
            {status}
          </ArticleDd>
        </ArticleDl>
        {(startDate || endDate) && (
          <>
            <Separator />
            <ArticleDl itemProp={"releaseDate"}>
              {startDate && (
                <>
                  <ArticleDt>Date début :</ArticleDt>
                  <ArticleDd>{startDate}</ArticleDd>
                </>
              )}
              {endDate && (
                <>
                  <ArticleDt>Date fin :</ArticleDt>
                  <ArticleDd>{endDate}</ArticleDd>
                </>
              )}
            </ArticleDl>
          </>
        )}
        {description && (
          <>
            <Separator />
            <section
              itemProp={"description"}
              className="px-6 py-2 text-sm text-muted-foreground"
            >
              Description : {description}
            </section>
          </>
        )}
        {warningText && (
          <>
            <Separator />
            <div
              itemProp="negativeNotes"
              className="w-fit flex items-center gap-x-3 px-4 py-1.5 mx-6 my-4 rounded-md bg-destructive font-medium"
            >
              <AlertTriangle
                width="16"
                height="16"
                className="text-destructive-foreground"
              />
              <span className="inline-block text-sm text-destructive-foreground">
                Attention : {warningText}
              </span>
            </div>
          </>
        )}
        <Separator />
      </CardContent>
      <CardFooter className="pb-4">
        <div className="flex flex-col gap-2 text-sm xl:flex-row w-full">
          {additionalUrl && (
            <Link
              href={additionalUrl}
              target="_blank"
              className={cn(
                buttonVariants({ variant: "secondary" }),
                "flex-1 w-full"
              )}
            >
              Kit secondaire
            </Link>
          )}
          <Link
            href={url}
            target="_blank"
            itemProp="url"
            className={cn(
              buttonVariants({ variant: "default" }),
              "flex-1 w-full"
            )}
          >
            En savoir +
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
