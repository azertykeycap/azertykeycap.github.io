import * as React from "react";
import SingleDropshippingWebsite from "@/components/dropshipping-site/site-single";
import { contentfulClient, getDropshippingSites } from "@/lib/api/contentful";
import { TypographyH1 } from "@/components/core/typography/h1";
import { richTextFromMarkdown } from "@contentful/rich-text-from-markdown";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { TypeDropshippingInformationPageSkeleton } from "@/types/content-types";
import { TypographyP } from "@/components/core/typography/p";
import { notFound } from "next/navigation";

async function getData() {
  const dropshippingInformationPage =
    await contentfulClient.getEntries<TypeDropshippingInformationPageSkeleton>({
      content_type: "dropshippingInformationPage",
    });

  const { title, description, youtubeUrl } =
    dropshippingInformationPage.items[0].fields;

  return {
    pageTitle: title,
    pageDescription: description,
    youtubeUrl,
  };
}

export default async function DropshippingSites() {
  const { pageTitle, pageDescription, youtubeUrl } = await getData();
  return process.env.NODE_ENV === "production" ? (
    notFound()
  ) : (
    <main className="container my-12">
      <TypographyH1>{pageTitle}</TypographyH1>
      <TypographyP>{pageDescription}</TypographyP>
      <iframe
        className="w-full aspect-video rounded-lg shadow-lg mt-12"
        title={youtubeUrl}
        src={youtubeUrl}
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        frameBorder="0"
        allowFullScreen
      />
    </main>
  );
}
