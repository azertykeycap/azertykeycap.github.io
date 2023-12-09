import ArticleList from "@/components/articles/article-list";
import { getArticles, getProfileSlugs } from "@/lib/api/contentful";
import { Metadata } from "next";

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { articlesBySlug } = await getData(params.slug);

  return {
    title: `Azerty Keycaps - ${articlesBySlug[0].profile.title}`,
    description: articlesBySlug[0].profile.description,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { articlesBySlug } = await getData(params.slug);

  return (
    <main className="container my-12">
      <ArticleList
        articles={articlesBySlug}
        profile={articlesBySlug[0].profile}
      />
    </main>
  );
}
