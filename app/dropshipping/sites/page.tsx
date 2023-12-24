import * as React from "react";
import SingleDropshippingWebsite from "@/components/dropshipping-site/site-single";
import { contentfulClient, getDropshippingSites } from "@/lib/api/contentful";
import { TypographyH1 } from "@/components/core/typography/h1";
import { richTextFromMarkdown } from "@contentful/rich-text-from-markdown";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { TypeDropshippingSitesPageSkeleton } from "@/types/content-types";
import { TypographyP } from "@/components/core/typography/p";

async function getData() {
  const dropshippingSitesPage =
    await contentfulClient.getEntries<TypeDropshippingSitesPageSkeleton>({
      content_type: "dropshippingSitesPage",
    });

  const { title, description } = dropshippingSitesPage.items[0].fields;

  const dropshippingWebsitesRaw = await getDropshippingSites();

  const dropshippingWebsites = await Promise.all(
    dropshippingWebsitesRaw.map(async (site) => ({
      ...site,
      examples: site.examples
        ? await documentToHtmlString(await richTextFromMarkdown(site.examples))
        : undefined,
    }))
  );

  return {
    dropshippingWebsites,
    pageTitle: title,
    pageDescription: description,
  };
}

export default async function DropshippingSites() {
  const { dropshippingWebsites, pageTitle, pageDescription } = await getData();

  return (
    <main className="container my-12">
      <TypographyH1>{pageTitle}</TypographyH1>
      <TypographyP>{pageDescription}</TypographyP>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
        {dropshippingWebsites.map((site, i) => (
          <SingleDropshippingWebsite
            key={i}
            site={site}
            isHighPriority={i < 4}
          />
        ))}
      </div>
    </main>
  );
}
