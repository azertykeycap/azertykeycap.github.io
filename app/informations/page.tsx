import * as React from "react";

import type { TypeInformation__rich__textSkeleton } from "@/types/content-types";
import { contentfulClient, getRandomOgApiImg } from "@/lib/api/contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

export async function generateMetadata({}) {
  const randomOgApi = await getRandomOgApiImg();

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
    title: "Azertykeycaps - Informations",
    description:
      "Informations techniques générales concernant le site Azertykeycaps.",
    openGraph: {
      title: "Azertykeycaps - Informations",
      description:
        "Informations techniques générales concernant le site Azertykeycaps.",
      images: [
        {
          url: `/og?imgUrl=${randomOgApi}&title=Informations`,
          width: 1200,
          height: 630,
          alt: "Azertykeycaps - Informations",
        },
      ],
    },
    twitter: {
      title: "Azertykeycaps - Informations",
      description:
        "Informations techniques générales concernant le site Azertykeycaps.",
      image: `${process.env.NEXT_PUBLIC_URL}/og?imgUrl=${randomOgApi}&title=Informations`,
    },
  };
}

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
