import ArticleList from "@/components/articles/article-list";
import { TypographyH1 } from "@/components/core/typography/h1";
import { TypographyP } from "@/components/core/typography/p";
import {
  getArticles,
  getProfileSlugs,
  getRandomOgApiImg,
} from "@/lib/api/contentful";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const allProfileSlugs = await getProfileSlugs();

  return allProfileSlugs.map((profile) => ({
    slug: profile,
  }));
}

async function getData(slug: string) {
  const articlesBySlug = await getArticles(slug);
  return { articlesBySlug };
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata | undefined> {
  const { articlesBySlug } = await getData(params.slug);
  const randomOgApi = await getRandomOgApiImg();

  if (articlesBySlug.length > 0)
    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
      title: `Azertykeycaps - ${articlesBySlug[0].profile.title ?? ""}`,
      description: articlesBySlug[0].profile.description ?? "",
      openGraph: {
        title: `Azertykeycaps - ${articlesBySlug[0].profile.title ?? ""}`,
        description: articlesBySlug[0].profile.description ?? "",
        locale: "fr_FR",
        type: "website",
        images: [
          {
            url: `/og?imgUrl=${randomOgApi}&title=${
              articlesBySlug[0].profile.title ?? ""
            }`,
            width: 1200,
            height: 630,
            alt: `Azertykeycaps - ${articlesBySlug[0].profile.title ?? ""}`,
          },
        ],
      },
      twitter: {
        title: `Azertykeycaps - ${articlesBySlug[0].profile.title ?? ""}`,
        description:
          "Informations techniques générales concernant le site Azertykeycaps.",
        images: `${
          process.env.NEXT_PUBLIC_URL
        }/og?imgUrl=${randomOgApi}&title=${
          articlesBySlug[0].profile.title ?? ""
        }`,
      },
    };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { articlesBySlug } = await getData(params.slug);

  if (!(articlesBySlug.length > 0)) {
    notFound();
  }

  return (
    <main className="container my-12">
      <section itemScope itemType="https://schema.org/ProductCollection">
        <meta itemProp="name" content={articlesBySlug[0].profile.title} />

        {articlesBySlug[0].profile.description && (
          <meta
            itemProp="description"
            content={articlesBySlug[0].profile.description}
          />
        )}

        <TypographyH1 itemProp="name">
          {articlesBySlug[0].profile.title}
        </TypographyH1>

        {articlesBySlug[0].profile.description && (
          <TypographyP itemProp="description">
            {articlesBySlug[0].profile.description}
          </TypographyP>
        )}

        <ArticleList articles={articlesBySlug} />
      </section>
    </main>
  );
}
