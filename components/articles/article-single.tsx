import { cn, getStatusColor } from "@/lib/utils";
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
import { AlertTriangle, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Badge } from "../ui/badge";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";

export interface ArticleProps {
  article: KeycapArticleContentfulInterface;
  isHighPriority: boolean;
  className?: string;
}

export default function SingleArticle({
  article,
  isHighPriority,
  className,
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

  const {
    bg: bgStatusColor,
    text: textStatusColor,
    bgHover: bgHoverStatusColor,
  } = getStatusColor(status);

  return (
    <Card
      className={cn(className)}
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

      <CardHeader className="relative">
        <div className="absolute inset-2 bottom-auto z-10 flex justify-between">
          {isNew && (
            <Badge variant="default" className="flex items-center gap-x-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground/75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-foreground"></span>
              </span>
              <span>Nouveau</span>
            </Badge>
          )}
          {warningText && (
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger>
                  <Badge
                    variant="destructive"
                    className="flex items-center gap-x-2"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground/75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-foreground"></span>
                    </span>
                    <span>Avertissement</span>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent className="max-w-[280px] text-center py-2 bg-destructive text-destructive-foreground">
                  {warningText}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <Image
          src={`https:${img}?fit=fill&w=560&h=370&fm=webp&q=70`}
          alt={title}
          loading={isHighPriority ? "eager" : "lazy"}
          decoding={isHighPriority ? "auto" : "async"}
          itemProp="image"
          height={370}
          width={560}
          className="border-b -mt-2"
          priority={isHighPriority}
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
          <ArticleDd itemProp={"availability"}>
            <Badge
              variant="secondary"
              className={cn(
                "uppercase",
                bgStatusColor,
                textStatusColor,
                bgHoverStatusColor
              )}
            >
              {status}
            </Badge>
          </ArticleDd>
        </ArticleDl>
        <>
          <Separator />
          <ArticleDl itemProp={"releaseDate"}>
            <ArticleDt>Date début :</ArticleDt>
            <ArticleDd>{startDate ?? "Aucune"}</ArticleDd>
            <ArticleDt>Date fin :</ArticleDt>
            <ArticleDd>{endDate ?? "Aucune"}</ArticleDd>
          </ArticleDl>
        </>
        <Separator />
        {!description || description?.length === 0 ? (
          <section>
            <div className="flex flex-1 items-center justify-between pb-4 text-sm font-medium px-6">
              Aucune indication sur ce keyset.
            </div>
            <Separator />
          </section>
        ) : (
          description?.length > 0 && (
            <Accordion type="single" collapsible>
              <AccordionItem value="description" className="px-6">
                <AccordionTrigger className="pt-0 font-semibold disabled:cursor-not-allowed">
                  Indications sur le keyset
                </AccordionTrigger>
                <AccordionContent>{description}</AccordionContent>
              </AccordionItem>
            </Accordion>
          )
        )}
      </CardContent>
      <CardFooter className="pb-4 pt-auto">
        <div className="flex flex-col gap-2 text-sm xl:flex-row w-full">
          {additionalUrl && (
            <Link
              href={additionalUrl}
              target="_blank"
              className={cn(
                buttonVariants({ variant: "outline" }),
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
              "flex-1 w-full flex items-center gap-x-2"
            )}
          >
            <span>Voir le set</span>
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
