import contentful, { Asset } from "contentful";

export interface KeycapArticleContentfulInterface {
  readonly img: Asset;
  readonly title: string;
  readonly profile: Record<"fields", { title: string; slug: string }>;
  readonly description?: string;
  readonly material: string;
  readonly status?: string;
  readonly startDate?: Date;
  readonly endDate?: Date;
  readonly url?: string;
  readonly warning?: string;
  readonly isNew?: boolean;
}

export type KeycapArticleType = Omit<
  KeycapArticleContentfulInterface,
  "img" | "profile" | "startDate" | "endDate"
> & {
  img: string;
  profile: string;
  startDate?: string;
  endDate?: string;
};

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});
