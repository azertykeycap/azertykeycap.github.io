import contentful, { Asset, Entry } from 'contentful';
import type { Document } from '@contentful/rich-text-types';
export interface InformationContentfulInterface {
  title: string;
  informationRichText: Document;
}

export interface SocialNetworkContentfulInterface {
  title: string;
  url: string;
  svgIcon: Asset;
}

export interface ProfileContentfulInterface {
  readonly title: string;
  readonly slug: string;
  readonly abbreviation: string;
}

export enum StatusEnum {
  IN_STOCK = 'En stock',
  GB_RUNNING = 'GB en cours',
  GB_OVER = 'GB terminé',
  IC = 'Interest Check',
  OUT_STOCK = 'Out Of Stock'
}

export interface KeycapArticleContentfulInterface {
  readonly img: Asset;
  readonly title: string;
  readonly profile: Entry<ProfileContentfulInterface>;
  readonly description?: string;
  readonly material: string;
  readonly status?: StatusEnum;
  readonly startDate?: Date;
  readonly endDate?: Date;
  readonly url: string;
  readonly additionalUrl?: string;
  readonly warningText?: string;
  readonly isNew?: boolean;
}

export type KeycapArticleType = Omit<
  KeycapArticleContentfulInterface,
  'img' | 'profile' | 'startDate' | 'endDate'
> & {
  img: string;
  profile: string;
  profileId: string;
  startDate?: string;
  endDate?: string;
};

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? 'preview.contentful.com' : 'cdn.contentful.com'
});
