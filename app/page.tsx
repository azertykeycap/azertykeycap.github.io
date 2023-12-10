import SingleArticle from "@/components/articles/article-single";
import Description from "@/components/core/typography/description";
import { TypographyH1 } from "@/components/core/typography/h1";
import { TypographyH2 } from "@/components/core/typography/h2";
import { buttonVariants } from "@/components/ui/button";
import {
  getArticles,
  getHomePageInformation,
  homePageContentType,
} from "@/lib/api/contentful";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { group } from "radash";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Azerty Keycaps - Annuaire de keycaps françaises",
  description:
    "Azertykeycaps est un site communautaire répertoriant les derniers keysets possédant une compatibilité AZERTY (ou ISO-FR) dans le hobby des claviers mécaniques.",
  icons: "/next.svg",
  // openGraph: {
  //   title: "Azerty Keycaps - Annuaire de keycaps françaises",
  //   description:
  //     "Azertykeycaps est un site communautaire répertoriant les derniers keysets possédant une compatibilité AZERTY (ou ISO-FR) dans le hobby des claviers mécaniques.",
  //   locale: "fr_FR",
  //   images: [
  //     {
  //       url: "https://azertykeycaps.fr/og.png",
  //       width: 1200,
  //       height: 630,
  //       alt: "Azerty Keycaps - Annuaire de keycaps françaises",
  //     },
  //   ],
  // },
  // twitter: {
  //   title: "Azerty Keycaps - Annuaire de keycaps françaises",
  //   description:
  //     "Azertykeycaps est un site communautaire répertoriant les derniers keysets possédant une compatibilité AZERTY (ou ISO-FR) dans le hobby des claviers mécaniques.",
  //   site: process.env.NEXT_PUBLIC_SITE_URL,
  //   card: "summary_large_image",
  // },
};

async function getData() {
  const homepageContent = await getHomePageInformation();
  const [headingHomepageTitle, ...rest] = homepageContent.title.split(" ");
  const remainingHeadingHomepageTitle = rest.join(" ");

  const articlesBySlug = (await getArticles()).filter((e) =>
    homepageContent.profileCards.some((p) => e.profile.title === p.title)
  );

  const groupedArticles = group(articlesBySlug, (a) => a.profile.title);
  const displayedArticles: homePageContentType = {};

  Object.keys(groupedArticles).map(
    (key: string) =>
      (displayedArticles[key] = groupedArticles[key]?.slice(0, 4) ?? [])
  );

  return {
    homepageContent,
    headingHomepageTitle,
    remainingHeadingHomepageTitle,
    displayedArticles,
  };
}

export default async function Home() {
  const {
    homepageContent,
    headingHomepageTitle,
    remainingHeadingHomepageTitle,
    displayedArticles,
  } = await getData();

  return (
    <main className="container my-12 flex flex-col gap-y-6">
      <TypographyH1>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 dark:via-white to-red-500 dark:to-red-500">
          {headingHomepageTitle}
        </span>{" "}
        {remainingHeadingHomepageTitle}
      </TypographyH1>
      <Description text={homepageContent.description} />
      <section className="mt-8 space-y-10">
        {Object.keys(displayedArticles).map((key, i) => (
          <div key={key}>
            <header className="flex items-center justify-between">
              <TypographyH2 className="font-bold text-3xl">{key}</TypographyH2>
              <Link
                href={`/profil/${displayedArticles[key][0].profile.slug}`}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "gap-x-1"
                )}
              >
                Voir plus
                <ArrowRight width={16} height={16} />
              </Link>
            </header>
            <div className="flex flex-nowrap lg:grid mt-6 lg:grid-cols-4 gap-x-4 overflow-x-scroll lg:overflow-hidden snap-x">
              {displayedArticles[key].map((e) => (
                <SingleArticle
                  article={e}
                  key={e.title}
                  isHighPriority={i === 0}
                  className="shrink-0 snap-center w-fit"
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
