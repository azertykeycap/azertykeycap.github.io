import { getArticles, getProfileSlugs } from "@/lib/api/contentful";

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

export default async function Page({ params }: { params: { slug: string } }) {
  const { articlesBySlug } = await getData(params.slug);

  return (
    <main className="container mt-12">{JSON.stringify(articlesBySlug)}</main>
  );
}
