import contentful, { Asset } from "contentful";

export interface KeycapArticleContentfulInterface {
  img: Asset;
  title: string;
  profile: string;
  description?: string;
  material: string;
  status?: string;
  startDate?: Date;
  endDate?: Date;
  url?: string;
  warning?: string;
  isNew?: boolean;
}

export type KeycapArticleType = Omit<
  KeycapArticleContentfulInterface,
  "img" | "startDate" | "endDate"
> & {
  img: string;
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
