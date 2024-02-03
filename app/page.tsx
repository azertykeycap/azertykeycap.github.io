import SingleArticle from "@/components/articles/article-single";
import Description from "@/components/core/typography/description";
import { TypographyH1 } from "@/components/core/typography/h1";
import { TypographyH2 } from "@/components/core/typography/h2";
import { buttonVariants } from "@/components/ui/button";
import {
  KeycapArticleContentfulInterface,
  getArticles,
  getHomePageInformation,
  homePageContentType,
} from "@/lib/api/contentful";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { group } from "radash";

async function getData() {
  const homepageContent = await getHomePageInformation();
  const [headingHomepageTitle, ...rest] = homepageContent.title.split(" ");
  const remainingHeadingHomepageTitle = rest.join(" ");

  const articlesBySlug = (await getArticles()).filter((e) =>
    homepageContent.profileCards.some((p) => e.profile.title === p.title)
  );

  const groupedArticles = group(articlesBySlug, (a) => a.profile.title);

  const desiredOrder: string[] = homepageContent.profileCards.map(
    (e) => e.title
  );

  const reorderedArticles: Record<string, KeycapArticleContentfulInterface[]> =
    desiredOrder.reduce(
      (result: Record<string, KeycapArticleContentfulInterface[]>, profile) => {
        if (groupedArticles.hasOwnProperty(profile)) {
          result[profile] = groupedArticles[profile]!;
        }
        return result;
      },
      {}
    );

  const displayedArticles: homePageContentType = {};

  Object.keys(reorderedArticles).map(
    (key: string) =>
      (displayedArticles[key] = reorderedArticles[key]?.slice(0, 4) ?? [])
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
                  className="shrink-0 snap-center w-fit h-fit"
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
