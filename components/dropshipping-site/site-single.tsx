import { cn } from "@/lib/utils";
import type { DropshippingWebsiteInterface } from "@/lib/api/contentful";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { Input } from "../ui/input";
import ArticleDd from "../articles/lists/description-data";
import ArticleDl from "../articles/lists/description-list";
import ArticleDt from "../articles/lists/description-term";
import CopyButton from "../core/copy-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface DropshippingWebsiteProps {
  site: DropshippingWebsiteInterface;
  isHighPriority: boolean;
  className?: string;
}

export default function SingleDropshippingWebsite({
  site,
  isHighPriority,
  className,
}: DropshippingWebsiteProps) {
  const { img, title, description, url, examples, categories } = site;

  return (
    <Card
      className={cn("relative", className)}
      itemScope
      itemType="https://schema.org/Product"
    >
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="url" content={url} />
      <meta itemProp="image" content={img} />

      <CardHeader className="relative">
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
        <CardTitle className="text-lg px-6 pt-2 pb-3 truncate text-center cursor-clown">
          {title}
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="text-sm p-0 py-4 space-y-4">
        {description && (
          <>
            <section
              itemProp={"description"}
              className="px-6 text-sm text-muted-foreground"
            >
              <p className="text-balance">{description}</p>
            </section>
            <Separator />
          </>
        )}
        {categories && (
          <>
            <ArticleDl>
              <ArticleDt>Catégories :</ArticleDt>
              <ArticleDd itemProp={"category"}>
                {categories.map((category, i) => (
                  <Badge key={i}>{category}</Badge>
                ))}
              </ArticleDd>
            </ArticleDl>
            <Separator />
          </>
        )}
        {examples && (
          <>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" className="px-6">
                <AccordionTrigger className="pt-0 font-semibold">
                  Quelques articles dropshippés
                </AccordionTrigger>
                <AccordionContent>
                  <article
                    className="prose-sm dark:prose-invert prose-p:leading-5 prose-ul:list-disc prose-li:my-0 prose-a:underline"
                    dangerouslySetInnerHTML={{
                      __html: examples,
                    }}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        )}
      </CardContent>
      <CardFooter className="pb-4">
        <div className="flex flex-col gap-2 text-sm xl:flex-row w-full xl:items-center">
          <span className="font-semibold shrink-0 hidden xl:inline-block">
            URL du site :
          </span>
          <div className="flex w-full items-center gap-2">
            <Input
              placeholder={url}
              className="flex-1 w-full placeholder:text-card-foreground"
              disabled
            />
            <CopyButton className="shrink-0" url={url} />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
