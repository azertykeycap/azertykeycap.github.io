import * as React from "react";

import type { TypeInformation__rich__textSkeleton } from "@/types/content-types";
import { contentfulClient } from "@/lib/api/contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

async function getData() {
  const informationEntry =
    await contentfulClient.getEntries<TypeInformation__rich__textSkeleton>({
      content_type: "information-rich-text",
    });

  const informationContent = documentToHtmlString(
    informationEntry.items[0].fields.informationRichText
  );

  return { informationContent };
}

export default async function Informations() {
  const { informationContent } = await getData();

  return (
    <main className="container my-12">
      <article
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{
          __html: informationContent,
        }}
      />
    </main>
  );
}
